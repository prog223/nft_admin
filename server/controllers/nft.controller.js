import Nft from '../models/nft.model.js';
import Request from '../models/request.model.js';
import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config({
	cloud_name: 'nane',
	api_key: '286748269635974',
	api_secret: 'Vix0LMxynMqbVGXASBvqlm_b-lc',
});

export const createNft = async (req, res, next) => {
	try {
		const result = await cloudinary.uploader.upload(req.body.image, {
			folder: 'nft',
		});
		
		if (req.isSuper) {
			const newNft = new Nft({
				...req.body,
				image: result.secure_url,
			});
			await newNft.save();
			res.status(201).send('Nft successfully created');
		} else {
			const newRequest = new Request({
				...req.body,
				image: result.secure_url,
				admin: req.userId,
			});
			await newRequest.save();
			res.status(201).send('Request successfully created');
		}
	} catch (error) {
		next(error);
	}
};

export const getNfts = async (req, res, next) => {
	const q = req.query;

	const filters = {
		...(q.search && { name: { $regex: q.search, $options: 'i' } }),
	};

	let currentPage = parseInt(q.page) || 1;
	const itemsPerPage = parseInt(q.limit) || 10;

	try {
		const totalCount = await Nft.countDocuments();
		const startIndex = (currentPage - 1) * itemsPerPage;

		if (totalCount < startIndex) {
			currentPage = 1;
		}

		const nfts = await Nft.find(filters)
			.skip((currentPage - 1) * itemsPerPage)
			.limit(q.limit)
			.populate('creator', ['username'])
			.populate('collectionId', ['name'])
			.select({
				name: true,
				price: true,
				bid: true,
				description: true,
				category: true,
				expirationDate: true,
				image: true
			})
			.exec();

		const pagination = {
			total: (await Nft.find(filters)).length,
			currentPage,
		};

		return res.status(200).send({
			nfts,
			pagination,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteNfts = async (req, res, next) => {
	try {
		await Nft.deleteMany({ _id: { $in: req.body } });
		res.status(200).send('deleted');
	} catch (error) {
		next(error);
	}
};
