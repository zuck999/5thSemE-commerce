import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "sonner";
import type { AxiosError, AxiosResponse } from "axios";

// Define the Product interface (consistent with ProductCard.tsx)
interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity?: number;
  [key: string]: any;
}


interface CartState {
  cart: Product[];
  total: number;
  getCartItems: () => Promise<any>;
  clearCart: () => void;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  total: 0,

  getCartItems: async () => {
    try {
      const res: AxiosResponse<Product[]> = await axios.get("/cart");
	  console.log("cart res>>",res);
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error((error as AxiosError<{ message?: string }>).response?.data?.message || "An error occurred");
    }
  },

  clearCart: () => {
    set({ cart: [], total: 0 });
  },

  addToCart: async (product: Product) => {
    try {
      await axios.post("/cart", { productId: product._id });

      set((prevState) => {
        const existingItem = prevState.cart.find((item) => item._id === product._id);
		existingItem?toast.error(product.name + "is already in your cart"): toast.success(product.name + " added to cart ");
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      toast.error((error as AxiosError<{ message?: string }>).response?.data?.message || "An error occurred");
    }
  },

  removeFromCart: async (productId: string) => {
    try {
      await axios.delete("/cart", { data: { productId } });
      set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
      get().calculateTotals();
    } catch (error) {
      toast.error((error as AxiosError<{ message?: string }>).response?.data?.message || "An error occurred");
    }
  },

  updateQuantity: async (productId: string, quantity: number) => {
    if (quantity === 0) {
      await get().removeFromCart(productId);
      return;
    }

    try {
      await axios.put(`/cart/${productId}`, { quantity });
      set((prevState) => ({
        cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
      }));
      get().calculateTotals();
    } catch (error) {
      toast.error((error as AxiosError<{ message?: string }>).response?.data?.message || "An error occurred");
    }
  },

  calculateTotals: () => {
    const { cart } = get();
    const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const total = subtotal;
    set({ total });
  },
}));
