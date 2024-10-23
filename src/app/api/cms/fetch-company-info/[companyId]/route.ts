import prisma from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { companyId: string } }
) {
  try {
    const companyId = params.companyId;
    const companyInformation = await prisma.company.findFirst({
      where: {
        id: companyId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: `successfully fetched company! ${companyInformation?.name}`,
      data: companyInformation,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `some error occurred: ${error}`,
    });
  }
}
