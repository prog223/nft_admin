import Content from '../models/content.model.js';
import Nft from '../models/nft.model.js';

export const createContent = async (req, res, next) => {
	try {
		const newContent = new Content({
			...req.body,
		});
		await newContent.save();
		res.status(201).send('Content successfully created');
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const updateContent = async (req, res, next) => {
	try {
		const content = await Content.findOne();
		console.log(req.body);
		if (req.body.greetings) {
			content.greetings = req.body.greetings;
			await content.save();
		}

		if (req.body.trending) {
			await Content.updateOne(
				{ 'trending._id': req.body.trending._id },
				{
					$set: {
						'trending.$.collection': req.body.trending.collection,
					},
				}
			).exec();
		}

		if (req.body.discover) {
			await Content.updateOne(
				{ 'discover._id': req.body.discover._id },
				{
					$set: {
						'discover.$.nft': req.body.discover.nft,
					},
				}
			).exec();
		}

		if (req.body.single) {
			content.single = req.body.single;
			await content.save();
		}

		res.send(content);
	} catch (error) {
		next(error);
	}
};

export const getContent = async (req, res, next) => {
	try {
		const content = await Content.findOne()
			.populate('greetings')
			.populate({
				path: 'trending.collection',
				populate: {
					path: 'creator',
					model: 'User',
					select: ['username', 'avatar'],
				},
			})
			.populate({
				path: 'discover.nft',
				populate: {
					path: 'creator',
					model: 'User',
					select: ['username', 'avatar'],
				},
			})
			.populate({
				path: 'single',
				populate: {
					path: 'creator',
					model: 'User',
					select: ['username', 'avatar'],
				},
			});

		await Promise.all(
			content.trending.map(async (e) => {
				const nft = await Nft.find({ collectionId: e.collection._id })
					.limit(3)
					.select('image');
				e.collection.nfts = nft;
			})
		);

		res.status(200).send(content);
	} catch (error) {
		next(error);
	}
};
