import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import notFound from "./middleware/notFound.js";
import "./db/mongo.js";
import errorHandler from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Core middleware
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Static files (optional)
app.use(express.static(path.join(__dirname, "../public")));

// API routes
app.use("/api", routes);

// 404 + Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
