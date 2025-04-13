let attempts = {};

const bruteForceGuard = (req, res, next) => {
  const ip = req.ip;
  attempts[ip] = attempts[ip] || { count: 0, time: Date.now() };

  if (Date.now() - attempts[ip].time > 5 * 60 * 1000) {
    attempts[ip] = { count: 0, time: Date.now() };
  }

  if (attempts[ip].count > 10) {
    return res
      .status(429)
      .json({ message: "Too many requests. Try again later." });
  }

  attempts[ip].count++;
  next();
};
module.exports = bruteForceGuard;
