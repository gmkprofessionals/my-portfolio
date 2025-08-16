import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema (
  {
    usrName: {
      type: String,
      trim: true,
    },
    usrEmail: {
      type: String,
      trim:true
    },
    usrPhone: {
      type: String,
      trim: true,
    },
    usrImage: {
      type: String,
    },
    usrDesignation: {
      type: String,
      trim: true,
    },
    usrLocation: {
      type: String,
      trim: true,
    },
    usrPassword: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
},{timestamps: true});

export default mongoose.models.Users || mongoose.model('Users', usersSchema);
