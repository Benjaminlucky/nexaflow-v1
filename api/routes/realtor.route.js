import express from "express";
import realtorSignup, {
  realtorSignin,
} from "../controller/realtor.controller.js";

const router = express.Router();

router.post("/signup", realtorSignup);
router.post("/signin", realtorSignin);

export default router;
