import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(
      `You are successfully connected to the MYSQL database: ${process.env.MYSQL_DATABASE}`
    );
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

testConnection();

export default pool;
