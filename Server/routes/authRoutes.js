const express = require("express");
const { register, login } = require("../contollers/authController");
const { check, validationResult } = require("express-validator");

const { verifyToken } = require("../middleware/authMiddleware");
const { loginLimiter } = require("../middleware/bruteForceFunction");

const router = express.Router();

// ✅ Validasyon sonucu kontrol middleware'i
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // hatasızsa devam
};

router.post(
  "/register",
  loginLimiter,
  [
    check("userName", "Lütfen bir kullanıcı adı giriniz.").not().isEmpty(),
    check("userPassword", "Şifre en az 6 karakter olmalıdır").isLength({
      min: 6,
    }),
  ],
  handleValidationErrors,
  register
);

router.post(
  "/login",
  loginLimiter,
  [
    check("userName", "Lütfen bir kullanıcı adı giriniz.").not().isEmpty(),
    check("userPassword", "Lütfen bir şifre giriniz").not().isEmpty(),
  ],
  handleValidationErrors,
  login
);

router.get("/denemetablo", verifyToken, (req, res) => {
  res.json({ message: "Access to denemetablo granted!", user: req.user });
});

module.exports = router;
