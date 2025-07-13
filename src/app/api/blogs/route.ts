import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "../../../../dbConnect";
import Blogs from "../../../../Modals/Blogs";
import slugify from "slugify";

type BlogType = {
  title: string;
  slug?: string;
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
    const slug = searchParams.get('slug');
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = 100;
    const skip = (page - 1) * limit;

    // If slug is provided, prioritize getting single blog
    if (slug) {
      const blgList = await Blogs.find({ slug })
        .populate('author', 'usrName')
        .sort({ createdAt: -1 })
        .lean();

      if (!blgList.length) {
        return NextResponse.json({ success: false, msg: 'No blogs found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, blgList }, { status: 200 });
    }

    // Otherwise, handle search + pagination
    const filter: Record<string, unknown> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const [blgList, totalCount] = await Promise.all([
      Blogs.find(filter)
        .populate('author', 'usrName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blogs.countDocuments(filter),
    ]);

    return NextResponse.json({ success: true, blgList, totalCount }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, msg: 'Error while fetching blogs: ' + errorMessage },
      { status: 500 }
    );
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

    const blogSlug = slug || slugify(title, { lower: true, strict: true });

    const newBlog = new Blogs({
      title,
      slug: blogSlug,
      content,
      author,
      category,
      tags,
      featuredImage,
      isPublished,
      publishedAt: isPublished ? new Date() : undefined,
    });

    const savedBlog = await newBlog.save();
    return NextResponse.json(
      { success: true, savedBlog, msg: "Blog created successfully." },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map((val) => val.message);
      return NextResponse.json(
        { success: false, msg: messages },
        { status: 400 }
      );
    }

    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error saving blog:", error);
    return NextResponse.json(
      { success: false, msg: `Server Error: ${errorMsg}` },
      { status: 500 }
    );
  }
}