import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('RaceNationHub');

    const event = await db.collection('events').findOne({ url: params.id });
    if (!event) {
      return new Response(JSON.stringify({ message: 'Event not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(event), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error fetching event' }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('RaceNationHub');
    const updatedData = await request.json(); 

    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updatedData }
    );
    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: 'Event not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Event updated' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error updating event' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('RaceNationHub');

    const result = await db.collection('events').deleteOne({ _id: new ObjectId(params.id) });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: 'Event not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Event deleted' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error deleting event' }), { status: 500 });
  }
}
