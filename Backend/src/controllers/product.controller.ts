import type { Request, Response } from "express";
import Product from "../models/product.model.ts";
import { redis } from "../lib/redis.ts";
import cloudinary from "../lib/choudinary.ts";

export const getAllProducts = async (req:Request , res:Response):Promise<any> => {
	try {
		const products = await Product.find({}); // find all products
		res.json({ products });
	} catch (error:any) {
		console.log("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const getFeaturedProducts = async (req:Request, res:Response):Promise<any> => {
	try {
		let featuredProducts = await redis.get("featured_products");
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}

		// TODO===> type change
		featuredProducts = await Product.find({ isFeatured: true }).lean()as any// lean sends ==>js object 

		if (!featuredProducts) {
			return res.status(404).json({ message: "No featured products found" });
		}


		await redis.set("featured_products", JSON.stringify(featuredProducts));

		res.json(featuredProducts);
	} catch (error:any) {
		console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};



export const createProduct = async (req:Request, res:Response):Promise<any> => {
	try {
		const { name, description, price, image, category } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			category,
		});

		res.status(201).json({product,message:"product created success fully", success:true});
	} catch (error:any) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};



export const deleteProduct = async (req:Request, res:Response):Promise<any> => {
	try {
		const product = await Product.findById(req.params.id)as { _id?: string;image?: string; } | null;

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image ? product.image.split("/").pop()?.split(".")[0] : undefined;
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully",success:true});
	} catch (error:any) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};



export const getRecommendedProducts = async (req:Request, res:Response):Promise<any> => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error:any) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const getProductsByCategory = async (req:Request, res:Response):Promise<any>  => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error:any) {
		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
