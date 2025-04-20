const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");
const { verifyOTP, generate2FASecret } = require("../config/twofa");
const {
  getAdminByUsername,
  updateAdminLoginInfo,
  getAdminById
} = require("../models/adminAuthModel");
const sendResponse = require("../utils/commonResponse");
const qrcode = require('qrcode');

const loginAdmin = async (req, res) => {
  if (!req.body) {
    console.log("Request body is required");
    return sendResponse(res, "error", "Request body is required", 400);
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, "error", "Email and password are required", 400);
    }
    const admin = await getAdminByUsername(email);

    if (!admin) {
      return sendResponse(res, "error", "Admin not found", 404);
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return sendResponse(res, "error", "Invalid credentials", 401);
    }


    const qrSecret = await generate2FASecret(admin.email);
    const qrCodeURL =  await qrcode.toDataURL(qrSecret.otpauth_url);

    await updateAdminLoginInfo(admin.id, qrSecret.base32);
    return sendResponse(
      res,
      "success",
      "Login successful. Please proceed to 2FA verification",
      200,
      {
        admin_id: admin.id,
        requires_2fa: true,
        qrCodeURL: qrCodeURL,
      }
    );
  } catch (error) {
    console.error("Error logging in admin:", error);
    sendResponse(res, "error", "Internal server error", 500);
  }
};
const verify2FA = async (req, res) => {
  try {
    const { admin_id, totp_code } = req.body;

    if (!admin_id || !totp_code) {
      return sendResponse(
        res,
        "error",
        "Admin ID and TOTP code are required",
        400
      );
    }

    const admin = await getAdminById(admin_id);

    if (!admin || !admin.is_active) {
      return sendResponse(res, "error", "Admin not found or inactive", 404);
    }

    const isVerified = await verifyOTP(totp_code, admin.otp_secret);

    if (!isVerified) {
      return sendResponse(res, "error", "2FA verification failed", 401);
    }

    const token = generateToken(admin.id, admin.role);
    await updateAdminLoginInfo(admin.id, qrSecret.base32);

    return sendResponse(res, "success", "2FA verification successful", 200, {
      admin_id: admin.id,
      token: token,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    console.error("2FA verification failed:", error);
    sendResponse(res, "error", "Internal server error", 500);
  }
};
const logoutAdmin = async (req, res) => {
  try {
  } catch (error) {
    console.error("Logout Error:", error);
    sendResponse(res, "error", "Internal server error", 500);
  }
};
const forgotPassword = async (req, res) => {
  try {
  } catch (error) {
    console.error("Forgot Password Error:", error);
    sendResponse(res, "error", "Internal server error", 500);
  }
};
const resetPassword = async (req, res) => {
  try {
  } catch (error) {
    console.error("Reset Password Error:", error);
    sendResponse(res, "error", "Internal server error", 500);
  }
};

module.exports = {
  loginAdmin,
  verify2FA,
  //   logoutAdmin,
  //   forgotPassword,
  //   resetPassword,
};
