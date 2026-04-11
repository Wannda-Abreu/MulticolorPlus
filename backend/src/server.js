import dotenv from "dotenv";

import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { seedProducts } from "./data/seedProducts.js";
import { Product } from "./models/Product.js";

dotenv.config();

const port = Number(process.env.PORT) || 5000;

const seedDatabaseIfEmpty = async () => {
  const count = await Product.countDocuments();

  if (count === 0) {
    await Product.insertMany(seedProducts);
    console.log("Seed data loaded.");
  }
};

const start = async () => {
  try {
    await connectDB();
    await seedDatabaseIfEmpty();

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start backend", error);
    process.exit(1);
  }
};

start();
