/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Blogs from "../../../../Modals/Blogs";
import dbConnect from "../../../../dbConnect";
import mongoose from "mongoose";

type BlogType = {
  title: string;
  slug: string;
  content: string;
  author: mongoose.Types.ObjectId;
  category: string;
  tags?: string[];
  featuredImage?: string;
  isPublished?: boolean;
};

export async function GET(req: NextRequest) {
  
  try {

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 100;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const [blgList, totalCount] = await Promise.all([
      Blogs.find(filter)
        .populate("author", "usrName")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blogs.countDocuments(filter),
    ]);

    return NextResponse.json({ success: true, blgList, totalCount });
  } catch (error) {
    return new NextResponse("Error while fetching blogs: " + error, {
      status: 500,
    });
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