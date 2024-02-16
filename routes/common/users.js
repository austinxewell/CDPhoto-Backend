import express from "express";
import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
} from "../../database/common/userQueries.js";

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

router.post("/user", async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await createUser(userName, email, password);
  res.status(201).send(user);
});

router.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  await deleteUser(id);
  res.send(`User with ID:${id} has been permanently deleted`);
});

export default router;
