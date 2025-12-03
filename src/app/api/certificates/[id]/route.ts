import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "certificates.json");

interface Certificate {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  pdfUrl?: string;
  isActive: boolean;
  createdAt: string;
}

async function getCertificates(): Promise<Certificate[]> {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveCertificates(certificates: Certificate[]) {
  const dir = path.dirname(DATA_FILE);
  await mkdir(dir, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(certificates, null, 2));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const certificates = await getCertificates();

    const index = certificates.findIndex((c) => c.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    certificates[index] = {
      ...certificates[index],
      title: body.title ?? certificates[index].title,
      description: body.description ?? certificates[index].description,
      imageUrl: body.imageUrl ?? certificates[index].imageUrl,
      pdfUrl: body.pdfUrl ?? certificates[index].pdfUrl,
      isActive: body.isActive ?? certificates[index].isActive,
    };

    await saveCertificates(certificates);

    return NextResponse.json({ certificate: certificates[index] });
  } catch (error) {
    console.error("Error updating certificate:", error);
    return NextResponse.json({ error: "Failed to update certificate" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const certificates = await getCertificates();

    const index = certificates.findIndex((c) => c.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    certificates.splice(index, 1);
    await saveCertificates(certificates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting certificate:", error);
    return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
  }
}
