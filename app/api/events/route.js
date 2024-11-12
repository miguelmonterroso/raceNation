import clientPromise from '../../../lib/mongodb';

export async function GET(request) {
    try {
      const client = await clientPromise;
      const db = client.db('RaceNationHub');
  
      const { searchParams } = new URL(request.url);
      const category = searchParams.get('category');
  
      const query = category ? { category } : {};  
      const events = await db.collection('events').find(query).toArray();
  
      return new Response(JSON.stringify(events), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: 'Error fetching events' }), { status: 500 });
    }
  }

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('RaceNationHub');
    const newEvent = await request.json(); 

    // const eventDate = new Date(eventData.eventDate);
    // eventData.isUpcoming = eventDate > new Date();

    const result = await db.collection('events').insertOne(newEvent);
    return new Response(JSON.stringify({ message: 'Event created', eventId: result.insertedId }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error creating event' }), { status: 500 });
  }
}
