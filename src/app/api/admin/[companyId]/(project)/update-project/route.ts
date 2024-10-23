import prisma from "@/lib/dbConnect";
import { Project } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    // Parse the request body
    const body: Project = await req.json();

    // Update the project
    const updatedProject = await prisma.project.update({
      data: {
        data: body.data ? body.data : {},
      }, // Directly update the project with the body
      where: {
        id: Number(body.id), // Assuming projectId is a string type
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Successfully updated! Project: ${JSON.stringify(
        updatedProject
      )}`,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `Some error occurred while updating the project, ${error}`,
    });
  }
}
