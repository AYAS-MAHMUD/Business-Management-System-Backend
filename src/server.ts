import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
import app from "./app";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("✅ MongoDB Connected");
    seedSuperAdmin()
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("❌ Database connection failed", error);
  }
}

main();
