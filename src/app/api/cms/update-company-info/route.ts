import prisma from "@/lib/dbConnect";
import { Company } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body: Company = await req.json();
    const updatedCompany = await prisma.company.update({
      data: body,
      where: {
        id: body.id,
      },
    });
    console.log(updatedCompany);

    return NextResponse.json({
      status: 200,
      message: `successfully updated company Information! ${updatedCompany?.name}`,
      data: updatedCompany,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `some error occurred: ${error}`,
    });
  }
}
