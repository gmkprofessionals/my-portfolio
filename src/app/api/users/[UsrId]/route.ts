import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "../../../../../dbConnect";
import Users from "../../../../../Modals/Users";

interface UserType {
  usrName: string;
  usrEmail: string;
  usrPhone: string;
  usrImage?: string;
  usrDesignation?: string;
  usrLocation?: string;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const {
      usrName,
      usrEmail,
      usrPhone,
      usrDesignation,
      usrLocation,
    }: UserType = await req.json();

    // Upsert user (match by usrEmail)
    const updatedUser = await Users.findOneAndUpdate(
      { usrEmail }, // condition to find existing user
      {
        $set: {
          usrName,
          usrPhone,
          usrDesignation,
          usrLocation,
        },
      },
      {
        new: true, // return updated document
        upsert: true, // create new if doesn't exist
      }
    );

    return NextResponse.json(
      { success: true, user: updatedUser, msg: "User saved successfully." },
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
    console.error("Error upserting user:", error);
    return NextResponse.json(
      { success: false, msg: `Server Error: ${errorMsg}` },
      { status: 500 }
    );
  }
}
