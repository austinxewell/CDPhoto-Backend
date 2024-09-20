import pool from "../database/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
