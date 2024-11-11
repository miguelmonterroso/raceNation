import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('RaceNationHub');
    const category = await db.collection('categories').findOne({ _id: new ObjectId(params.id) });
    if (!category) {
      return new Response(JSON.stringify({ message: 'Category not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error fetching category' }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('RaceNationHub');
    const updatedData = await request.json();
    const result = await db.collection('categories').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updatedData }
    );
    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: 'Category not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Category updated' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error updating category' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('RaceNationHub');
    const result = await db.collection('categories').deleteOne({ _id: new ObjectId(params.id) });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: 'Category not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Category deleted' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error deleting category' }), { status: 500 });
  }
}
