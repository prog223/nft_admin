import mongoose from 'mongoose';
import Nft from '../models/nft.model.js';

const { Schema } = mongoose;


const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		address: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: false,
		},
		bio: {
			type: String,
			required: false,
		},
		verified: {
			type: Boolean,
			required: true,
			default: false,
		},
		nfts: [{ type: Schema.Types.ObjectId, ref: 'Nft' }],
	},
	{
		timestamps: true,
	}
);

userSchema.pre(
	'deleteMany',
	{ document: false, query: true },
	async function (next) {
		const docs = await this.model.find(this.getFilter());
		const users = docs.map((item) => item._id);
		await Nft.deleteMany({ creator: { $in: users } });
		next();
	}
);

export default mongoose.model('User', userSchema);
