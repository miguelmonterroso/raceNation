import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please add your Mongo URI to .env.local");

const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export clientPromise for other uses
export default clientPromise;

// Function to explicitly connect to the database
export async function connectToDB() {
  const client = await clientPromise;
  const db = client.db("RaceNationHub"); // Usar el nombre de la base de datos definido en tu URI
  return db;
}
