/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import Blogs from '../../../../../Modals/Blogs';
import dbConnect from '../../../../../dbConnect';
import mongoose from 'mongoose';

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

export async function GET(req:NextRequest, { params }: { params: Promise<{ BlgId: string }> }) {
  try {
    await dbConnect();
    const { BlgId } = await params;
    const blgById = await Blogs.findById(BlgId);

    if (!blgById) {
      return NextResponse.json({ msg: 'No Blog Found.' }, { status: 404 });
    } else {
      return NextResponse.json({ blgById, success: true }, { status: 200 });
    }
  } catch (error) {
    return new NextResponse('Error while fetching blgData: ' + error, { status: 500 });
  }
}

export async function PUT( req: NextRequest,{ params }: { params: Promise<{ BlgId: string }> }) {
  
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
    }: BlogType = await req.json();

    const { BlgId } = await params;
    const updatedBlog = await Blogs.findByIdAndUpdate(
      BlgId,
      {
        title,
        slug,
        content,
        author,
        category,
        tags,
        featuredImage,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBlog) {
      return NextResponse.json({ success: false, msg: 'Blog not found.' }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, msg: 'Blog updated successfully.', updatedBlog },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      return NextResponse.json({ success: false, msg: messages }, { status: 400 });
    } else {
      return new NextResponse('Error while updating blog: ' + error, { status: 500 });
    }
  }
}

export async function PATCH(req: NextRequest,{ params }: { params: Promise<{ BlgId: string }> }) {

  try {

    await dbConnect();
    const { BlgId } = await params;
    const { isPublished } = await req.json();

    const updateFields: { isPublished: boolean; publishedAt: Date | null } = {
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    };

    const updatedBlog = await Blogs.findByIdAndUpdate(BlgId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return NextResponse.json({ success: false, msg: 'Blog not found.' }, { status: 404 });
    }

    const action = isPublished ? 'published' : 'unpublished';
    return NextResponse.json(
      { success: true, msg: `Blog ${action} successfully.`, updatedBlog },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, msg: 'Error updating publish status.', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req:NextRequest, { params }: { params: Promise<{ BlgId: string }> }) {

  try {

    await dbConnect();
    const { BlgId } = await params;

    if (!BlgId) {
      return NextResponse.json({ success: false, msg: 'No Blog Found.' }, { status: 404 });
    } else {
      const delBlg = await Blogs.findByIdAndDelete(BlgId);
      return NextResponse.json(
        { delBlg, success: true, msg: 'Blog deleted successfully.' },
        { status: 200 }
      );
    }
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      return NextResponse.json({ success: false, msg: messages }, { status: 400 });
    } else {
      return new NextResponse('Error while deleting data: ' + error, { status: 400 });
    }
  }
}
