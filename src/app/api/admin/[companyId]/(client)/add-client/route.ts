import prisma from "@/lib/dbConnect";
import { Client } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: Client = await req.json();

  try {
    const addedclient = await prisma.client.create({
      data: {
        name: body.name,
        companyId: body.companyId,
        data: body.data ? body.data : {},
      },
    });

    return NextResponse.json({
      status: 200,
      message: `successfully added a new client ${addedclient.name}`,
      data: { client: addedclient },
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `some error occurred: ${error}`,
    });
  }
}
