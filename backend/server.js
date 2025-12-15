import dotenv from "dotenv";
// Load env vars ASAP to ensure process.env.JWT_SECRET is available everywhere
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import path from "path";
import fs from "fs";

// Check for required environment variables
if (!process.env.JWT_SECRET) {
  console.error("FATAL: JWT_SECRET is not set in your environment variables.");
  process.exit(1);
}

connectDB();

const app = express();

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
// Also support non-`/api` prefix in case frontend VITE_API_URL omits `/api`
app.use("/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/orders", orderRoutes);

// Serve frontend static files if built (Vite -> dist)
const clientDist = path.resolve(process.cwd(), "frontend", "dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));

  // For any GET request that isn't handled by the API, serve index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// Fallback 404 for API routes (and when frontend not available)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
