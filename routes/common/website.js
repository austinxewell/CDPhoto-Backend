import express from "express";
import { authenticateToken } from "../../middleware/auth.js";
import {
  getWebsiteInfo,
  postWebsiteInfo,
} from "../../database/common/websiteQueries.js";

const router = express.Router();

router.get("/websiteInfo", async (req, res) => {
  const results = await getWebsiteInfo();
  res.send(results);
});

router.post("/postWebsiteInfo", authenticateToken, async (req, res) => {
  const results = await postWebsiteInfo(req.body);

  res.send(results);
});

export default router;
