import prisma from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({
      status: 200,
      message: `successfully fetched user infortmation!`,
      data: { users: users },
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `some error occurred while deleting the User, ${error}`,
    });
  }
}
