/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Blogs from "../../../../Modals/Blogs";
import dbConnect from "../../../../dbConnect";
import mongoose from "mongoose";

export type BlogType = {
  title: string;
  slug: string;
  content: string;
  author: mongoose.Types.ObjectId; 
  category: string;
  tags?: string[]; 
  featuredImage?: string;
  isPublished?: boolean;
};


export async function GET(){

    try { 
      await dbConnect();
      const blgList: BlogType[] = await Blogs.find()
      .populate('author', 'usrName')
      .sort({ createdAt: -1 });
      
      if (!blgList) {
        return NextResponse.json({success:false, msg: "No categories found" }, { status: 404 });
      } else {
        return NextResponse.json({ blgList, success: true }, {status:200});
      }
    } catch (error) {
        return new NextResponse("Error while fetching catData: " + error, {status:500});
    }
  }
  
  export async function POST(req: NextRequest) {
  
    try {
      await dbConnect();
      const {   
        title,
        slug,
        content,
        author, 
        category,
        tags,
        featuredImage,
        isPublished,
    }: BlogType = await req.json();
  
    const newBlog = new Blogs({ 
        title,
        slug,
        content,
        author, 
        category,
        tags,
        featuredImage,
        isPublished,
    });

      const savedBlog = await newBlog.save();
      return NextResponse.json({ savedBlog, success: true, msg:"Blog created successfully." }, {status:200});
  
    } catch (error:any) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((val:any) => val.message);
        return NextResponse.json({ success: false, msg: messages }, {status:400});
      }else{
        return new NextResponse ("Error while saving catData: " + error, {status: 500});
      }
    }
}