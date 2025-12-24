import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import "./types/express";

import authRoutes from "./routes/auth.routes";
import bookRoutes from './routes/book.routes';
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";
import userRoutes from "./routes/user.routes";
import analyticsRoutes from "./routes/analytics.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));