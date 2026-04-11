import mongoose from "mongoose";

import { Product } from "../models/Product.js";

const normalizeProductPayload = (payload) => ({
  ...payload,
  price: Number(payload.price),
  oldPrice:
    payload.oldPrice === "" || payload.oldPrice === null || payload.oldPrice === undefined
      ? null
      : Number(payload.oldPrice),
  stock:
    payload.stock === "" || payload.stock === null || payload.stock === undefined
      ? 0
      : Number(payload.stock),
  rating:
    payload.rating === "" || payload.rating === null || payload.rating === undefined
      ? 4.5
      : Number(payload.rating),
});

export const getProducts = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const filters = {};

    if (category && category !== "Todas") {
      filters.category = category;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      filters.$or = [
        { name: regex },
        { category: regex },
        { description: regex },
      ];
    }

    const products = await Product.find(filters).sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id." });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(normalizeProductPayload(req.body));
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id." });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      normalizeProductPayload(req.body),
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id." });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
