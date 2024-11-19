import { connectToDB } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await connectToDB();
    const categories = await db.collection('categories').find({}).toArray();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error fetching categories' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = await connectToDB();
    const newCategory = await request.json();
    const result = await db.collection('categories').insertOne(newCategory);
    return new Response(
      JSON.stringify({ message: 'Category created', categoryId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error creating category' }), { status: 500 });
  }
}
