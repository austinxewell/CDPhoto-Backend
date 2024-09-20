import pool from "../config.js";
import bcrypt from "bcryptjs";

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

export async function getUser(id) {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM users
      WHERE user_id = ?
    `,
    [id]
  );
  return rows[0];
}

export async function createUser(
  user_full_name,
  user_email,
  user_password,
  confirm_password
) {
  try {
    // Check if the email already exists
    const [results] = await pool.query(
      `SELECT user_email FROM users WHERE user_email = ?`,
      [user_email]
    );

    // Handle email existence and password confirmation
    if (results.length > 0) {
      return { message: "That email is already in use" };
    } else if (user_password !== confirm_password) {
      return { message: "Passwords do not match" };
    }

    var salt = bcrypt.genSaltSync(10);
    let hashedPassword = await bcrypt.hash(user_password, salt);

    // Insert the new user
    const [insertResult] = await pool.query(
      `INSERT INTO users (user_full_name, user_email, user_password) VALUES (?, ?, ?)`,
      [user_full_name, user_email, hashedPassword]
    );

    const id = insertResult.insertId;
    const createdUser = await getUser(id);

    console.log(`User "${user_full_name}" was successfully created`);

    return {
      message: `User "${user_full_name}" was successfully created`,
      user: createdUser || {},
    };
  } catch (error) {
    console.error("Error inserting user:", error);
    throw new Error("User creation failed");
  }
}

export async function deleteUser(id) {
  try {
    const [result] = await pool.query(
      `
        DELETE FROM users
        WHERE user_id = ?
      `,
      [id]
    );
    console.log(`User with ID:${id} has been permanently deleted`);
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("User deletion failed");
  }
}
