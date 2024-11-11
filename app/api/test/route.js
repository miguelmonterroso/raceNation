import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('RaceNationHub');
    
    const collections = await db.listCollections().toArray();
    
    const collectionNames = collections.map((collection) => collection.name);
    
    return new Response(JSON.stringify({ collections: collectionNames }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: 'Error connecting to database' }), { status: 500 });
  }
}
