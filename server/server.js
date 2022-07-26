import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
// connect the MongoDB database
connectDB();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
