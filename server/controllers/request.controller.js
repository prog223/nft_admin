import Request from '../models/request.model.js';
import Nft from '../models/nft.model.js';
import { v2 as cloudinary } from 'cloudinary';
import { createError } from '../utils/createError.js';
import { sendEmail } from '../utils/mailer.js';

cloudinary.config({
	cloud_name: 'nane',
	api_key: '286748269635974',
	api_secret: 'Vix0LMxynMqbVGXASBvqlm_b-lc',
});

export const getRequests = async (req, res, next) => {
	const q = req.query;

	const filters = {
		...(q.search && { name: { $regex: q.search, $options: 'i' } }),
		...(!req.isSuper && { admin: req.userId }),
	};

	let currentPage = parseInt(q.page) || 1;
	const itemsPerPage = parseInt(q.limit) || 10;

	try {
		const totalCount = await Request.countDocuments();
		const startIndex = (currentPage - 1) * itemsPerPage;

		if (totalCount < startIndex) {
			currentPage = 1;
		}

		const requests = await Request.find(filters)
			.skip((currentPage - 1) * itemsPerPage)
			.limit(q.limit)
			.populate('creator', ['username'])
			.populate('collectionId', ['name'])
			.populate('admin', ['name', 'email'])
			.exec();

		const pagination = {
			total: (await Request.find(filters)).length,
			currentPage,
		};

		return res.status(200).send({
			requests,
			pagination,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteRequest = async (req, res, next) => {
	try {
		await Request.deleteOne({ _id: req.body.id });
		const title = 'Request information';
		const text = `${req.body.text}`;

		sendEmail(req.body.email, title, text, req.email);
		
		res.status(200).send('deleted');
	} catch (error) {
		next(error);
	}
};

export const confirm = async (req, res, next) => {
	try {
		if (!req.isSuper) return createError(400, 'No rights');

		const request = await Request.findById(req.params.id);
		if (!request) return createError(404, 'Request not found');
		
		const { admin, ...rest } = request._doc;
		const newNft = await Nft.create(rest);
		await newNft.save();

		await Request.deleteOne({ _id: req.params.id });
		res.status(201).send('Request confirmed');
	} catch (error) {
		next(error);
	}
};