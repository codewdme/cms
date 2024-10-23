import prisma from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    return NextResponse.json({
      status: 200,
      message: `successfully deleted! , ${deletedUser}`,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `some error occurred while deleting the User, ${error}`,
    });
  }
}
