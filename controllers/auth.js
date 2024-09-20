import pool from "../database/config.js";
import bcrypt from "bcryptjs";

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
    // Send JWT
    return { message: "Successfully Logged In" };
  }
}
