import mongoose from 'mongoose';
import Users from './Users';

const blogSchema = new mongoose.Schema (
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Users, 
    },
    category: {
        type: String,
        required:true,
        trim: true,
    }, 
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    featuredImage: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt:{
        type:Date
    }
},{timestamps: true});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
