import pool from "../database/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUsers } from "../database/common/userQueries.js";

import dotenv from "dotenv";
dotenv.config();

export async function loginAuth(user_email, user_password) {
  const [results] = await pool.query(
    `
    SELECT *
    FROM users
    WHERE user_email = ?
    `,
    [user_email]
  );

  if (results.length !== 1) {
    return { message: "No users found with that email" };
  }
  const isMatch = await bcrypt.compare(user_password, results[0].user_password);
  if (!isMatch) {
    return { message: "Invalid Password" };
  } else {
    const user = { name: results[0].user_full_name };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    const full_user_details = results[0];
    return {
      message: "Successfully Logged In",
      access_token: accessToken,
      user: full_user_details,
    };
  }
}

export async function authenticateToken(token) {
  if (!token) {
    console.error("No token provided");
    return { message: "No token provided" };
  }

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.error("Token verification error:", err); // Log the error
          return reject(err);
        }
        resolve(decoded);
      });
    });

    const users = await getUsers();
    const user = users.find((user) => user.user_full_name === decoded.name);

    if (!user) {
      console.error("User not found for name:", decoded.name);
      return { message: "User not found" };
    }

    return { accessToken: token, user: user };
  } catch (err) {
    console.error("Token error:", err);
    return { message: "Invalid token" };
  }
}
