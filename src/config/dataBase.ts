import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import { ServerApiVersion } from "mongodb";

dotenv.config();

const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_URL as string, {
      ssl: true,
      serverApi: {
        version: ServerApiVersion.v1,
      },
    } as ConnectOptions);
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default dbConnect;