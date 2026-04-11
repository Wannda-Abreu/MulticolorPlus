import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import { seedProducts } from "./data/seedProducts.js";
import { Product } from "./models/Product.js";

dotenv.config();

const runSeed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Unable to seed database", error);
    process.exit(1);
  }
};

runSeed();
