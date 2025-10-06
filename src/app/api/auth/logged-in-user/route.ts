import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

interface DecodedPayload {
  id?: string;     // 👈 your login response sets `user._id`
  name?: string;
  email?: string;
  [key: string]: unknown;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ userId: null }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const { id } = payload as DecodedPayload;

    return NextResponse.json(
      { userId: id ?? null },
      { status: id ? 200 : 401 }
    );
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.json({ userId: null }, { status: 401 });
  }
}