import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

dotenv.config();
// connect the MongoDB database
connectDB();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json({limit: '10mb'}));
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:8000"]
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");

    next();
  });


//   app.use("/api/home", (req, res) => {
//     res.send("THis is the home route")
//   });

  app.use("/api/users", userRoutes);
    
  app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
  });