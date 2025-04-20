const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/adminauth.routes");

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Nimmoh Agency Banking Admin API",
  });
});

app.use("/api/v1/auth", authRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
