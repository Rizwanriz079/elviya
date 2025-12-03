import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all legal pages
export async function GET() {
  try {
    const pages = await prisma.legalPage.findMany();
    return NextResponse.json({ pages });
  } catch (error) {
    console.error("Error fetching legal pages:", error);
    return NextResponse.json({ error: "Failed to fetch legal pages" }, { status: 500 });
  }
}
