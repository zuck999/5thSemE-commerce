import express ,  { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import path from "path";
import { connectDB } from "../src/lib/bd.js";
import cors from "cors"


import authRoutes from "../src/routes/auth.route.js";
import productRoutes from "../src/routes/product.route.js";
import cartRoute from "./routes/cart.route.js"
const app = express();

const crosOption = {
	origin:`http://localhost:5173`,
    credentials:true,
}
app.use(urlencoded({extended:true}));


app.use(cors(crosOption));

dotenv.config();

const PORT = process.env.PORT || 5001;



// const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoute);


app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});
