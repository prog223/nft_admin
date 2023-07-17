import Collection from '../models/collection.model.js';

export const getCollections = async (req, res, next) => {
	const q = req.query;

	const filters = {
		...(q.search && { name: { $regex: q.search, $options: 'i' } }),
	};

	let currentPage = parseInt(q.page) || 1;
	const itemsPerPage = parseInt(q.limit) || 10;

	try {
		const totalCount = await Collection.countDocuments();
		const startIndex = (currentPage - 1) * itemsPerPage;
		const collections = await Collection.find(filters)
			.skip((currentPage - 1) * itemsPerPage)
			.populate('creator', ['username'])
			.limit(q.limit)
			.exec()

		if (totalCount < startIndex) {
			currentPage = 1;
		}

		const pagination = {
			total: (await Collection.find(filters)).length,
			currentPage,
		};

		return res.status(200).send({
			collections,
			pagination,
		});
	} catch (error) {
		next(error);
	}
};

export const createCollection = async (req, res, next) => {
	try {
		const newCollection = new Collection({
			...req.body,
		});
		await newCollection.save();
		res.status(201).send('Collection successfully created');
	} catch (error) {
		next(error);
	}
};

export const deleteCollections = async (req, res, next) => {
	try {
		await Collection.deleteMany({ _id: { $in: req.body } });
		res.status(200).send('deleted');
	} catch (error) {
		next(error);
	}
};