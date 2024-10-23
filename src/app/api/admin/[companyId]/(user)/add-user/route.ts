import prisma from "@/lib/dbConnect";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: User = await req.json();

  try {
    const addedUser = await prisma.user.create({
      data: body,
    });
    if (body.role === "admin") {
      const updatedCompanyAdmin = await prisma.company.update({
        data: {
          adminId: addedUser.id,
        },
        where: {
          id: body.companyId,
        },
      });

      if (updatedCompanyAdmin.adminId === addedUser.id) {
        return NextResponse.json({
          status: 200,
          message: `successfully added ${addedUser.name} as new user for ${updatedCompanyAdmin.name} as ${addedUser.role}`,
          data: { user: addedUser },
        });
      }
      return NextResponse.json({
        status: 200,
        message: `successfully added a new user ${addedUser.name}  as ${addedUser.role}`,
        data: { user: addedUser },
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `some error occurred: ${error}`,
    });
  }
}
