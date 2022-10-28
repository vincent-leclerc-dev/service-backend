import { MongoClient } from "mongodb";
import 'dotenv/config';

const uri = process.env.SERVICE_MONGO_URI;

const client = new MongoClient(uri);

export async function cleanUsers() {
  try {

    await client.connect();

    const database = client.db();

    const users = database.collection('users');

    await users.deleteMany({});

  } finally {
    await client.close();
  }
}
