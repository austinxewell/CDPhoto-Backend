import pool from "../config.js";

export async function getWebsiteEmail() {
  const [results] = await pool.query(
    `
    SELECT website_email_address
    FROM website
    `
  );

  return results[0];
}

export async function getWebsitePhoneNumber() {
  const [results] = await pool.query(
    `
    SELECT website_phone_number
    FROM website
    `
  );

  return results[0];
}

export async function getSocialLinks() {
  const [results] = await pool.query(
    `
    SELECT *
    FROM contact_information
    `
  );

  return results;
}
