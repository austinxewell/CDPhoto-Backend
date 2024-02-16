import pool from "../config.js";

export async function getWebsiteInfo() {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM website
      WHERE id = 1
    `
  );
  return rows[0];
}
