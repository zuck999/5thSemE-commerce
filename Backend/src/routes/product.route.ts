import express from "express";


import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory  } from "../controllers/product.controller.ts";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.ts";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/category/:category", getProductsByCategory);



export default router;
