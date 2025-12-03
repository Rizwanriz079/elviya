import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single legal page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const page = await prisma.legalPage.findUnique({
      where: { id }
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ page });
  } catch (error) {
    console.error("Error fetching legal page:", error);
    return NextResponse.json({ error: "Failed to fetch legal page" }, { status: 500 });
  }
}

// PUT update legal page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const page = await prisma.legalPage.upsert({
      where: { id },
      update: {
        title: data.title,
        content: data.content,
      },
      create: {
        id,
        title: data.title,
        content: data.content,
      }
    });

    return NextResponse.json({ page, message: "Legal page updated successfully" });
  } catch (error) {
    console.error("Error updating legal page:", error);
    return NextResponse.json({ error: "Failed to update legal page" }, { status: 500 });
  }
}
