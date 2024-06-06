import express from "express";
import realtorSignup from "../controller/realtor.controller.js";

const router = express.Router();

router.post("/realtor", realtorSignup);

export default router;
