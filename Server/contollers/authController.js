const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sanitizeInput } = require("../middleware/sanityFunction");
const { getUserByUsername, createUser } = require("../models/userModel");

const register = async (req, res) => {
  try {
    const username = sanitizeInput(req.body.username);
    const password = sanitizeInput(req.body.password);
    const hashedPassword = await bcrypt.hash(password, 12);
    await createUser(username, hashedPassword);
    res.status(201).json({ message: "User registered." });
  } catch (err) {
    res.status(500).json({ error: "Registration failed." });
  }
};

const login = async (req, res) => {
  try {
    const username = sanitizeInput(req.body.username);
    const password = req.body.password;

    const user = await getUserByUsername(username);
    if (!user) return res.status(401).json({ error: "Invalid credentials." });

    const match = await bcrypt.compare(password, user.kullanici_sifre);
    if (!match) return res.status(401).json({ error: "Invalid credentials." });

    const token = jwt.sign(
      { id: user.id, username: user.kullanici_ad },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
};
module.exports = {
  register,
  login,
};
