import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema(
	{
		message: {
			type: String,
			required: true,
		},
		admins: Array,
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'Admin',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Message', messageSchema);