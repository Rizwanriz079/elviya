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

export async function GET() {
  try {
    const certificates = await getCertificates();
    return NextResponse.json({ certificates });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const certificates = await getCertificates();

    const newCertificate: Certificate = {
      id: `cert_${Date.now()}`,
      title: body.title,
      description: body.description || "",
      imageUrl: body.imageUrl,
      pdfUrl: body.pdfUrl || "",
      isActive: body.isActive ?? true,
      createdAt: new Date().toISOString(),
    };

    certificates.push(newCertificate);
    await saveCertificates(certificates);

    return NextResponse.json({ certificate: newCertificate });
  } catch (error) {
    console.error("Error creating certificate:", error);
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
}
