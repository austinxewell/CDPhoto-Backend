import express from "express";
import { loginAuth } from "../../controllers/auth.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { user_email, user_password } = req.body;

  const user = await loginAuth(user_email, user_password);

  res.status(201).send(user);
});

export default router;
