import prisma from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  const { projectId } = params;

  try {
    const deletedProject = await prisma.project.delete({
      where: {
        id: Number(projectId),
      },
    });

    return NextResponse.json({
      status: 200,
      message: `successfully deleted! , ${deletedProject}`,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `some error occurred while deleting the project, ${error}`,
    });
  }
}
