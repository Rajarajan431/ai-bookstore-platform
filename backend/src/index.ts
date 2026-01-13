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
import aiRoutes from "./routes/ai.routes";
import uploadRoutes from "./routes/upload.route";

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());

app.use("/auth", authRoutes)
app.use("/books", bookRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/ai", aiRoutes);
app.use("/cloudinary", uploadRoutes)


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));