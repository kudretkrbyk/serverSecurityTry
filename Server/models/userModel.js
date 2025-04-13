const { pool } = require("../config/db");

const getUserByUsername = async (username) => {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT * FROM kullanicilar WHERE kullanici_ad = ?",
    [username]
  );
  conn.release();
  return rows[0];
};

const createUser = async (username, hashedPassword) => {
  console.log("Creating user: model", username, hashedPassword);
  const conn = await pool.getConnection();
  await conn.query(
    "INSERT INTO kullanicilar (kullanici_ad, kullanici_sifre) VALUES (?, ?)",
    [username, hashedPassword]
  );
  console.log("burası geldi");
  conn.release();
};
module.exports = {
  getUserByUsername,
  createUser,
};
