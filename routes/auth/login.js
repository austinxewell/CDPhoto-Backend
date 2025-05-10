import express from "express";
import { loginAuth, authenticateToken } from "../../controllers/auth.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { user_email, user_password } = req.body;

  const user = await loginAuth(user_email, user_password);

  res.status(201).send(user);
});

router.get("/authenticate", async (req, res) => {
  const user = await authenticateToken(
    req.headers.authorization?.split(" ")[1]
  );

  res.status(201).send(user);
});

export default router;
