import prisma from "@/lib/dbConnect";
import { Project } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: Project = await req.json();

  try {
    const addedProject = await prisma.project.create({
      data: {
        data: body.data ? body.data : {},
        companyId: body.companyId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: `successfully added a project ${JSON.stringify(addedProject)}`,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `some error occurred: ${error}`,
    });
  }
}
