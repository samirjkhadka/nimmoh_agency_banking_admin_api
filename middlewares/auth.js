const jwt = require("jsonwebtoken");
const { verifyOTP } = require("../config/twofa");
const { jwtSecret } = require("../config/jwt");

const authenticate = (require2FA = false) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;

      if (require2FA && !decoded.twofa_verified) {
        return res
          .status(401)
          .json({ success: false, message: "2FA verification required" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };
};

module.exports = { authenticate };
