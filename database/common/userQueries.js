import pool from "../config.js";

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

export async function getUser(id) {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM users
      WHERE id = ?
    `,
    [id]
  );
  return rows[0];
}

export async function createUser(userName, email, password) {
  const [result] = await pool.query(
    `
      INSERT INTO users (userName, email, password)
      VALUES (?, ?, ?)
    `,
    [userName, email, password]
  );
  const id = result.insertId;
  return getUser(id);
}

export async function deleteUser(id) {
  const [result] = await pool.query(
    `
      DELETE FROM users
      WHERE id = ?
    `,
    [id]
  );
  return result;
}
