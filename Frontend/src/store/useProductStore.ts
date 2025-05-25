import { create } from "zustand";

import axios from "../lib/axios";
import { toast } from "sonner";


interface Product {
  _id: string;
  isFeatured: boolean;
  [key: string]: any;
}

export const useProductStore = create((set: any) => ({
  products: [] as [],
  loading: false,

  setProducts: (products: Product[]) => set({ products }),

  createProduct: async (productData: any): Promise<void> => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((prev: any) => ({
        products: [...prev.products, res.data],
        loading: false,
      }));
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to create product");
      set({ loading: false });
    }
  },

  fetchAllProducts: async (): Promise<void> => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      set({ products: res.data.products, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },

  fetchProductsByCategory: async (category: string): Promise<void> => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data.products, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },

  deleteProduct: async (productId: string): Promise<void> => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prev: any) => ({
        products: prev.products.filter((p: Product) => p._id !== productId),
        loading: false,
      }));
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to delete product");
      set({ loading: false });
    }
  },

  toggleFeaturedProduct: async (productId: string): Promise<void> => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/products/${productId}`);
      set((prev: any) => ({
        products: prev.products.map((p: Product) =>
          p._id === productId ? { ...p, isFeatured: res.data.isFeatured } : p
        ),
        loading: false,
      }));
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update product");
      set({ loading: false });
    }
  },

  fetchFeaturedProducts: async (): Promise<void> => {
    set({ loading: true });
    try {
      const res = await axios.get("/products/featured");
      set({ products: res.data, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch products", loading: false });
      console.log("Error fetching featured products:", error);
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },
}));