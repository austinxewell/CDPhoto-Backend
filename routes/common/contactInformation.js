import express from "express";
import {
  getWebsiteEmail,
  getWebsitePhoneNumber,
  getSocialLinks,
} from "../../database/common/contactInformationQueries.js";

const router = express.Router();

router.get("/websiteEmail", async (req, res) => {
  const websiteEmail = await getWebsiteEmail();
  res.send(websiteEmail);
});

router.get("/websitePhoneNumber", async (req, res) => {
  const websitePhoneNumber = await getWebsitePhoneNumber();
  res.send(websitePhoneNumber);
});

router.get("/socialLinks", async (req, res) => {
  const socialLinks = await getSocialLinks();
  res.send(socialLinks);
});

export default router;
