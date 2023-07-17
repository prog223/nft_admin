import mongoose from 'mongoose';
import Nft from '../models/nft.model.js';

const { Schema } = mongoose;

const collectionSchema = new Schema(
	{
		creator: { type: Schema.Types.ObjectId, ref: 'User' },
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		nfts: [],
	},
	{
		timestamps: true,
	}
);

collectionSchema.pre(
	'deleteMany',
	{ document: false, query: true },
	async function (next) {
		const docs = await this.model.find(this.getFilter());
		const collections = docs.map((item) => item._id);
		await Nft.deleteMany({ collectionId: { $in: collections } });
		next();
	}
);

export default mongoose.model('Collection', collectionSchema);
