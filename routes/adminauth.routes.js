const express = require("express");

const router = express.Router();
const {
  loginAdmin,
  verify2FA,
  logoutAdmin,
  forgotPassword,
  resetPassword,
} = require("../controllers/adminAuth.controller");

const {authenticateAdmin} = require('../middlewares/auth')

router.post("/login", loginAdmin);
router.post("/verify-2fa", verify2FA);
// router.post("/logout", authenticateAdmin, logoutAdmin);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

module.exports = router;