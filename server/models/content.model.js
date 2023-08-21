import mongoose from 'mongoose';

const { Schema } = mongoose;

const contentSchema = new Schema(
	{
		greetings: { type: Schema.Types.ObjectId, ref: 'NFT', required: true },
		trending: [
			{
				position: {
					type: Number,
					required: true,
				},
				collection: { type: Schema.Types.ObjectId, ref: 'Collection', required: true },
			},
		],
		discover: [
			{
				position: {
					type: Number,
					required: true,
				},
				nft: { type: Schema.Types.ObjectId, ref: 'NFT', required: true },
			},
		],
		single: { type: Schema.Types.ObjectId, ref: 'NFT', required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Content', contentSchema);
