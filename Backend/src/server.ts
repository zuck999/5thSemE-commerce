import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.ts"; 
import authRoutes from "./routes/auth.route.ts";
import productRoutes from "./routes/product.route.ts";
import cartRoute from "./routes/cart.route.ts";
import paymentRoutes from "./routes/khalti.route.ts"

dotenv.config();

const app = express();

// const allowedOrigins = ['http://localhost:5173'];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));

const crosOption = {
    origin:`http://localhost:5173`,
    credentials:true,
}
app.use(cors(crosOption));

// Enable pre-flight across-the-board with CORS options
// app.options('*', cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));

app.use(urlencoded({ extended: true }));
// app.options('*', cors());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoute);
app.use('/payment', paymentRoutes);


app.get("/test", (_, res) => {
    res.json({ message: "Mobile can access backend" });
});

// Server configuration
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
    connectDB();
});