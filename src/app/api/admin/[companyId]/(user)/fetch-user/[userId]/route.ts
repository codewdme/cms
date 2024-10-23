import prisma from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    return NextResponse.json({
      status: 200,
      message: `successfully fetched user infortmation!`,
      data: { user: user },
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `some error occurred while deleting the User, ${error}`,
    });
  }
}
