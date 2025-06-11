import express from "express";
import { protectRoute } from "../middleware/auth.middleware.ts";
import {  addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.ts";

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);

export default router;
