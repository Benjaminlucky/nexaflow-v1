import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import realtorRoutes from "./routes/realtor.route.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cors({ origin: "http://localhost:3001" }));

app.use(express.json());

app.use("/api/realtor", realtorRoutes); // Matches the URL in Axios request
app.use("/api/realtor", realtorRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
