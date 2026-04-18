export interface Product {
  id: string;
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

export type ProductPayload = Omit<
  Product,
  "id" | "oldPrice" | "rating" | "createdAt" | "updatedAt"
> & {
  oldPrice?: number | null;
  rating?: number;
};

export interface ProductFormValues {
  name: string;
  price: string;
  oldPrice: string;
  category: string;
  image: string;
  description: string;
  stock: string;
  rating: string;
}

export const emptyProductFormValues: ProductFormValues = {
  name: "",
  price: "",
  oldPrice: "",
  category: "",
  image: "",
  description: "",
  stock: "0",
  rating: "4.5",
};
