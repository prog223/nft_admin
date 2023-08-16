import Nft from '../models/nft.model.js';
import User from '../models/user.model.js';
import Collection from '../models/collection.model.js';

export const getInfo = async (req, res, next) => {
	try {
		const usersCount = await User.countDocuments();
		const nftsCount = await Nft.countDocuments();
		const collectionsCount = await Collection.countDocuments();

		res.status(200).send({ usersCount, nftsCount, collectionsCount });
	} catch (error) {
      next(error)
   }
};
   