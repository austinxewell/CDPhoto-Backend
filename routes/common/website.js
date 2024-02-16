import express from "express";
import { getWebsiteInfo } from "../../database/common/websiteQueries.js";

const router = express.Router();

router.get("/websiteInfo", async (req, res) => {
  const websiteInfo = await getWebsiteInfo();
  res.send(websiteInfo);
});

export default router;
