import pool from "../config.js";

export async function getGallery() {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM gallery
    `
  );
  return rows;
}

// HERO PHOTOS QUERRIES
export async function getHeroPhotos() {
  const [rows] = await pool.query(
    `
    SELECT w.website_id, g.photo_id, g.photo_url, g.photo_name
    FROM website w
    JOIN website_hero_photos whp ON w.website_id = whp.website_id
    JOIN gallery g ON whp.photo_id = g.photo_id
    WHERE w.website_id = 1;
    `
  );
  return rows;
}

export async function postHeroPhotos(idArr) {
  try {
    var queryString = "";

    idArr.forEach((id) => {
      queryString += `(1, ${id.toString()}),`;
    });

    queryString = queryString.slice(0, -1);

    await pool.query(
      `
      INSERT INTO website_hero_photos (website_id, photo_id)
      VALUES ${queryString};
      `
    );

    return {
      message: `Photos with the Id's of ${idArr} have been added to the Hero Photos`,
    };
  } catch (err) {
    console.error("Error inserting user:", err);
    throw new Error("User creation failed");
  }
}
