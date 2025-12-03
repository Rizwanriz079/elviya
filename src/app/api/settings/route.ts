import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET settings (public)
export async function GET() {
  try {
    let settings = await prisma.siteSettings.findFirst({
      where: { id: "settings" }
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "settings",
          brandName: "Elvia Herbals",
          tagline: "Pure Homemade Almond Oil",
          phone: "+919207067522",
          whatsapp: "919207067522",
          email: "hello@elviaherbals.com",
          instagram: "https://instagram.com/elviaherbals",
          address: "Kerala, India",
          aboutText: "ELVYA was born from a simple belief: that the best skincare comes from nature, made with love and traditional wisdom passed down through generations."
        }
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// PUT update settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const data = await request.json();

    const settings = await prisma.siteSettings.upsert({
      where: { id: "settings" },
      update: {
        brandName: data.brandName,
        tagline: data.tagline,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
        instagram: data.instagram,
        address: data.address,
        aboutText: data.aboutText
      },
      create: {
        id: "settings",
        brandName: data.brandName || "Elvia Herbals",
        tagline: data.tagline || "Pure Homemade Almond Oil",
        phone: data.phone || "+919207067522",
        whatsapp: data.whatsapp || "919207067522",
        email: data.email || "hello@elviaherbals.com",
        instagram: data.instagram || "",
        address: data.address || "",
        aboutText: data.aboutText || ""
      }
    });

    return NextResponse.json({ settings, message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
