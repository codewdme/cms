import prisma from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { clientId: string } }
) {
  const { clientId } = params;

  try {
    const deletedClient = await prisma.client.delete({
      where: {
        id: Number(clientId),
      },
    });

    return NextResponse.json({
      status: 200,
      message: `successfully deleted! , ${deletedClient}`,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `some error occurred while deleting the client, ${error}`,
    });
  }
}
