import pg from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Database is connected");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      process.exit(1);
    }
  }
};

export { client, connectDB };
