import mongoose from 'mongoose';

const { Schema } = mongoose;

const requestSchema = new Schema(
	{
		creator: { type: Schema.Types.ObjectId, ref: 'User' },
		collectionId: { type: Schema.Types.ObjectId, ref: 'Collection' },
		admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
		name: {
			type: String,
			required: true,
			unique: true,
		},
		price: {
			type: Number,
			required: true,
		},
		bid: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		expirationDate: {
			type: Date,
			required: false,
		},
		tags: [{ type: String }],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Request', requestSchema);