import express from "express";

import authRoutes from "./auth/login.js";
import userRoutes from "./common/users.js";
import websiteRoutes from "./common/website.js";
import galleryRoutes from "./common/gallery.js";
import contactInfoRoutes from "./common/contactInformation.js";

const router = express.Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(websiteRoutes);
router.use(galleryRoutes);
router.use(contactInfoRoutes);

console.log("here");

export default router;
