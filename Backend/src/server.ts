import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import path from "path";
import { connectDB } from "../src/lib/bd.js";

import authRoutes from "../src/routes/auth.route.js";
import productRoutes from "../src/routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;



// const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);





app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});
