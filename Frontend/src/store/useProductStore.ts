import { create } from "zustand";

import axios from "../lib/axios";
import { toast } from "sonner";


interface Product {
  _id: string;
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
      if(res.data.success){
        set((prev: any) => ({
          products: [...prev.products, res.data],
          loading: false,
        }));
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to create product");
      set({ loading: false });
    }
  },

  fetchAllProducts: async (): Promise<void> => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      console.log("frtch product>>",res)
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
      toast.success("The product has been successfully deleted!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to delete product");
      set({ loading: false });
    }
  },

}));

