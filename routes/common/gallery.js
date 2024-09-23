import express from "express";
import {
  getGallery,
  getHeroPhotos,
  postHeroPhotos,
} from "../../database/common/galleryQueries.js";
import { authenticateToken } from "../../middleware/auth.js";

const router = express.Router();

router.get("/gallery", async (req, res) => {
  const gallery = await getGallery();
  res.send(gallery);
});

router.get("/heroPhotos", async (req, res) => {
  const heroPhotos = await getHeroPhotos();
  res.send(heroPhotos);
});

router.post("/postHeroPhotos", authenticateToken, async (req, res) => {
  const response = await postHeroPhotos(req.body.photo_id_array);
  res.send(response);
});

export default router;
