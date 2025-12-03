import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        sizes: JSON.stringify(data.sizes || []),
        ingredients: JSON.stringify(data.ingredients || []),
        howToUse: JSON.stringify(data.howToUse || []),
        benefits: JSON.stringify(data.benefits || []),
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
