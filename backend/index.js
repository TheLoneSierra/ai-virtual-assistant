import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

// --- Multi-Origin CORS Configuration ---
const allowedOrigins = [
  "http://localhost:5173", // Local Vite/React
  process.env.FRONTEND_URL, // Your deployed URL (e.g., Vercel/Netlify)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());

// --- Health Check Route ---
app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

// --- Routes ---
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// --- Server Entry ---
app.listen(port, async () => {
  try {
    await connectDb();
    console.log(`Server started on port: ${port}`);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
});
