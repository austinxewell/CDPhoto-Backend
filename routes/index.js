import express from "express";
import userRoutes from "./common/users.js";
import websiteRoutes from "./common/website.js";

const router = express.Router();

router.use(userRoutes);
router.use(websiteRoutes);

export default router;
