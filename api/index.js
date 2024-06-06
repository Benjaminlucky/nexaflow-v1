import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import realtorRoutes from "./routes/realtor.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is connected in port 3000");
});

app.use("/api/", realtorRoutes);
