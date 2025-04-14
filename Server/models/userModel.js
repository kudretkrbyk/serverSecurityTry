const Kullanici = require('../models/Kullanici');

const getUserByUsername = async (username) => {
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