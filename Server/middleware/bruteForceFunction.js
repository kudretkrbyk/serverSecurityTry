// middleware/bruteForceFunction.js
const rateLimit = require("express-rate-limit");

// Sadece login endpoint'i için geçerli limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika içinde
  max: 5, // en fazla 5 deneme
  message: {
    status: 429,
    message:
      "Çok fazla başarısız giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.",
  },
  standardHeaders: true, // Rate limit bilgilerini response header'larında döner
  legacyHeaders: false,
});

module.exports = { loginLimiter };
