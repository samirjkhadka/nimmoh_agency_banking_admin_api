const speakeasy = require("speakeasy");

const generate2FASecret = (email) => {
  return speakeasy.generateSecret({
    name: `Nimmoh Agency Banking - ${email}`,
  });
};

const verifyOTP = (otp, secret) => {
  return speakeasy.totp.verify({
    secret: secret.base32,
    encoding: "base32",
    token: otp,
    window: 1,
  });
};

module.exports = {
  generate2FASecret,
  verifyOTP,
};
