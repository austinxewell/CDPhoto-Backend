import express from "express";
import userRoutes from "./common/users.js";
import websiteRoutes from "./common/website.js";
import loginRoutes from "./validation/login.js";

const router = express.Router();

router.use(userRoutes);
router.use(websiteRoutes);
router.use(loginRoutes);

export default router;
