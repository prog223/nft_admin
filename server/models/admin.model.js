import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      surname: {
         type: String,
         required: true,
      },
      email:{
         type: String,
         required: true,
         unique: true
      },
      password:{
         type: String,
         required: true,
      },
      avatar:{
         type: String,
      },
      isSuper: {
         type: Boolean,
         required: true
      }
   },
   {
      timestamps: true
   }
)

export default mongoose.model('Admin', adminSchema)