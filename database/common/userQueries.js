import pool from "../config.js";

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

export async function getUser(id) {
  console.log(id);
  const [rows] = await pool.query(
    `
      SELECT *
      FROM users
      WHERE user_id = ${id}
    `,
    [id]
  );
  return rows[0];
}

export async function createUser(user_full_name, user_email, user_password) {
  try {
    const [result] = await pool.query(
      `
        INSERT INTO users (user_full_name, user_email, user_password)
        VALUES (?, ?, ?)
      `,
      [user_full_name, user_email, user_password]
    );
    const id = result.insertId;
    console.log(`User "${user_full_name}" was successfully created`);
    return getUser(id);
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
