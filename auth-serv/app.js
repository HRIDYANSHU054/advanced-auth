import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import globalErrorHandler from "./errors/globalErrorHandler.js";

const app = express();

const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors({ origin: CLIENT_URL, credentials: true })); //cred: true -> to allow receiving cookies
app.use(express.json());
app.use(cookieParser()); //will allow us to parse incoming cookies

app.use("/api/auth", authRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../auth-cl/dist")));

  app.get("*", (req, resp) => {
    resp.sendFile(path.resolve(__dirname, "../auth-cl", "dist", "index.html"));
  });
}

//global Error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log("Server is running on port", PORT);
  await connectDB();
});
