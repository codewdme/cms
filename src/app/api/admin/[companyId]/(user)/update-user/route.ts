import prisma from "@/lib/dbConnect";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body: User = await req.json();

    const updateduser = await prisma.user.update({
      data: body,
      where: {
        id: Number(body.id),
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Successfully updated! user: ${JSON.stringify(updateduser)}`,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `Some error occurred while updating the user information, ${error}`,
    });
  }
}
