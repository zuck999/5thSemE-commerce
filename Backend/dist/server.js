import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import path from "path";
import authRoutes from "../src/routes/auth.route";
import { connectDB } from "../src/lib/bd.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
    connectDB();
});
