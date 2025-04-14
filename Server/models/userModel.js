const Kullanici = require("../models/users");

const getUserByUsername = async (username) => {
  console.log("Getting user by username: model", username);
  const user = await Kullanici.findOne({ where: { kullanici_ad: username } });
  return user;
};

const createUser = async (username, hashedPassword) => {
  console.log("Creating user: model", username, hashedPassword);
  await Kullanici.create({
    kullanici_ad: username,
    kullanici_sifre: hashedPassword,
  });
  console.log("burası geldi");
};

module.exports = {
  getUserByUsername,
  createUser,
};
