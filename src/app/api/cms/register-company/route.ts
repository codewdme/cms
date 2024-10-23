import prisma from "@/lib/dbConnect";
import { Company } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: Company = await req.json();

  try {
    const registeredCompany = await prisma.company.create({
      data: body,
    });

    return NextResponse.json({
      status: 200,
      message: `successfully registered new company! ${registeredCompany}`,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `some error occurred: ${error}`,
    });
  }
}
