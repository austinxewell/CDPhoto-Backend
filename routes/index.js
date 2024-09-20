import express from "express";

import userRoutes from "./common/users.js";
import websiteRoutes from "./common/website.js";
import authRoutes from "./auth/login.js";

const router = express.Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(websiteRoutes);

export default router;
