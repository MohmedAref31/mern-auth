import express from "express";
import { errorHandler } from "../utiles/errorHandler.js";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

router.use("*", (req, res, next) => {
  next(errorHandler("sorry this endpoint is not exist", 404));
});

export default router;
