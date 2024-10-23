import prisma from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { companyId: string } }
) {
  const companyId = params.companyId;
  try {
    const users = await prisma.client.findMany({
      where: {
        companyId: companyId,
      },
    });

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
