import { create } from "zustand";
import axios from "../lib/axios.ts";
import { toast } from "sonner";
import { useCartStore } from "./useCartStore.ts";






interface UserState {
  user: any; 
  loading: boolean;
  checkingAuth: boolean;


  signup: (params: SignupParams, navigate: (path: string) => void) => Promise<any>;
  login: (email: string, password: string, navigate: (path: string) => void) => Promise<void>;
  logout: (navigate: (path: string) => void) => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<any>; 
}


interface SignupParams {
  name: string;
  email: string;
  phone:string;
  password: string;
  confirmPassword: string;
}


export const useUserStore = create<UserState>((set, get) => ({

	user: null,
	loading: false,
	checkingAuth: true,

	signup: async ({ name, email, password, confirmPassword ,phone }:SignupParams,navigate) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}

		try {
			const res = await axios.post("/auth/signup", { name, email, password , phone });
			console.log("signup>>>>>",res)
			if(res.data.success){
				toast.success("Signed up successfully!");
				set({ user: res.data.user, loading: false });
				navigate("/login")
			}
		} catch (error:any) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},

	login: async (email, password , navigate) => {
		set({ loading: true });

		try {
			const res = await axios.post("/auth/login",{ email, password });
			if(res.data.success){
				set({ user: res.data.user, loading: false });
				toast.success(`Hello ${get()?.user?.name} 👋🏻 `);
				navigate("/")
			}

		} catch (error:any) {
			console.log(error.data);
			toast.error("Login error!!!");
		}finally{
			set({ loading: false });
		}
	},

	logout: async (navigate) => {
	const clearCart = useCartStore.getState().clearCart;

		try {
			await axios.post("/auth/logout");
			set({ user: null });
			toast.success("logout successfully !");
			navigate("/login")
			clearCart();
		} catch (error:any) {
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile");
			set({ user: response.data, checkingAuth: false });
		} catch (error:any) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	},

	refreshToken: async () => {
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error:any) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));
