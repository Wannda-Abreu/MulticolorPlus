import cors from "cors";
import express from "express";

import productRoutes from "./routes/productRoutes.js";

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/products", productRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error.",
      errors: Object.values(error.errors).map((entry) => entry.message),
    });
  }

  res.status(500).json({
    message: "Internal server error.",
  });
});
