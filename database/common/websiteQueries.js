import pool from "../config.js";

export async function getWebsiteInfo() {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM website
      WHERE website_id = 1
    `
  );
  return rows[0];
}

export async function postWebsiteInfo(params) {
  const { greeting, about, reviewHeader, reviewText, comment, avatar } = params;

  let fieldsToUpdate = [];
  let values = [];

  if (greeting !== undefined) {
    fieldsToUpdate.push("website_greeting = ?");
    values.push(greeting);
  }
  if (about !== undefined) {
    fieldsToUpdate.push("website_about = ?");
    values.push(about);
  }
  if (reviewHeader !== undefined) {
    fieldsToUpdate.push("website_review_header = ?");
    values.push(reviewHeader);
  }
  if (reviewText !== undefined) {
    fieldsToUpdate.push("website_review_text = ?");
    values.push(reviewText);
  }
  if (comment !== undefined) {
    fieldsToUpdate.push("website_comment = ?");
    values.push(comment);
  }
  if (avatar !== undefined) {
    fieldsToUpdate.push("website_avi = ?");
    values.push(avatar);
  }

  if (fieldsToUpdate.length === 0) {
    return { message: "No fields to update" };
  }

  const query = `UPDATE website SET ${fieldsToUpdate.join(
    ", "
  )} WHERE website_id = 1`;

  try {
    const [result] = await pool.execute(query, values);
    return { message: "Website info updated successfully", result };
  } catch (err) {
    console.error("Error updating website info:", err);
    throw err;
  }
}
