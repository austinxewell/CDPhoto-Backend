import express from "express";
import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
} from "../../database/common/userQueries.js";
import { authenticateToken } from "../../middleware/auth.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

router.post("/user", authenticateToken, async (req, res) => {
  const { user_full_name, user_email, user_password, confirm_password } =
    req.body;
  const user = await createUser(
    user_full_name,
    user_email,
    user_password,
    confirm_password
  );
  res.status(201).send(user);
});

router.delete("/user/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  await deleteUser(id);
  res.send(`User with ID:${id} has been permanently deleted`);
});

export default router;
