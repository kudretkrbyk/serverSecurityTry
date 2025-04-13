const express = require("express");
const { register, login } = require("../contollers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/denemetablo", verifyToken, (req, res) => {
  res.json({ message: "Access to denemetablo granted!", user: req.user });
});

module.exports = router;
