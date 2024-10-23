import prisma from "@/lib/dbConnect";
import { Client } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body: Client = await req.json();

    const updatedclient = await prisma.client.update({
      data: {
        name: body.name,
        companyId: body.companyId,
        data: body.data ? body.data : {},
      },
      where: {
        id: Number(body.id),
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Successfully updated! client information for ${updatedclient.name}`,
      data: updatedclient,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `Some error occurred while updating the client information, ${error}`,
    });
  }
}
