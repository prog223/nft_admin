import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
	try {
		const q = req.query;
		let currentPage = parseInt(q.page) || 1;
		const itemsPerPage = parseInt(q.limit) || 10;

		const filters = {
			...(q.search && { username: { $regex: q.search, $options: 'i' } }),
		};

		const totalCount = await User.countDocuments();
		const startIndex = (currentPage - 1) * itemsPerPage;

		if (totalCount < startIndex) {
			currentPage = 1;
		}

		const users = await User.find(filters)
			.skip((currentPage - 1) * itemsPerPage)
			.limit(q.limit)
			.select({
				username: true,
				avatar: true,
				email: true,
				address: true,
				verified: true,
			})
			.exec();

		const pagination = {
			total: (await User.find(filters)).length,
			currentPage,
		};

		return res.status(200).send({
			users,
			pagination,
		});
	} catch (e) {
		next(e);
	}
};

export const deleteUsers = async (req, res, next) => {
	try {
		await User.deleteMany({ _id: { $in: req.body } });
		res.status(200).send('deleted')
	} catch (error) {
		next(error);
	}
};
