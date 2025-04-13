const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/authRoutes.js");
const bruteForceGuard = require("./middleware/bruteForceFunction.js");

const app = express();

app.use(express.json());
app.use(bruteForceGuard);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
