export interface Product {
  _id: string;
  name: string;
  price: number;
  oldPrice: number | null;
  category: string;
  image: string;
  description: string;
  stock: number;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductPayload = Omit<Product, "_id" | "createdAt" | "updatedAt">;

export interface ProductFormValues {
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  stock: string;
}

export const emptyProductFormValues: ProductFormValues = {
  name: "",
  price: "",
  category: "",
  image: "",
  description: "",
  stock: "0",
};
