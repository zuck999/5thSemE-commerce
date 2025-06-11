
import type { Request, Response } from "express";
import Product from "../models/product.model.ts";

////TODO----->>>> set type type is not fixed---

export const getCartProducts = async (req:Request, res:Response):Promise<any>  => {

	try {
		const products = await Product.find({ _id: { $in: (req as any).user?.cartItems } })as any[]

		const cartItems = products.map((product) => {
			const item = (req as any).user.cartItems.find((cartItem: { id: string; quantity: number }) => (cartItem as any).id === product.id)
			return { ...product.toJSON(), quantity: item?.quantity ?? 0 };
		});

		res.json(cartItems);
	} catch (error:any) {
		console.log("Error in getCartProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req:Request, res:Response):Promise<any>  => {
        // req as CustomRequest;

	try {
		
		const { productId } = req.body;
		const user = (req as any).user;

		const existingItem = (user as any).cartItems.find((item:any) => item.id === productId);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			user.cartItems.push(productId);
		}

		await (user as any).save()
		res.json(user.cartItems);
	} catch (error:any) {
		console.log("Error in addToCart controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const removeAllFromCart = async (req:Request, res:Response):Promise<any>  => {
	try {
		const { productId } = req.body;
		const user = (req as any).user;
		if (!productId) {
			user.cartItems = [];
		} else {
			user.cartItems = user.cartItems.filter((item:any) => item.id !== productId);
		}
		await (user as any).save();
		res.json(user.cartItems);
	} catch (error:any) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateQuantity = async (req:Request, res:Response):Promise<any>  => {
	try {
		const { id: productId } = req.params;
		const { quantity } = req.body;
		const user = (req as any) .user;
		const existingItem = user.cartItems.find((item:any) => item.id === productId);

		if (existingItem) {
			if (quantity === 0) {
				user.cartItems = user.cartItems.filter((item:any) => item.id !== productId);
				await (user as any).save();
				return res.json(user.cartItems);
			}

			existingItem.quantity = quantity;
			await (user as any).save();
			res.json(user.cartItems);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error:any) {
		console.log("Error in updateQuantity controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


