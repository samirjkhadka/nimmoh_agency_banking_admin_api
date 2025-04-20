const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config/jwt");

const generateToken = (user, is2FAVerified = false) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role_id,
    twofa_verified: is2FAVerified,
  };

  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
};

module.exports = { generateToken };
