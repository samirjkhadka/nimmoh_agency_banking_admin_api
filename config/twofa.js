const speakeasy = require("speakeasy");

const generate2FASecret = (email) => {
  return speakeasy.generateSecret({
    name: `Nimmoh Agency Banking - ${email}`,
  });
};

const verifyOTP = (otp, base32Secret) => {

  return speakeasy.totp.verify({
    secret: base32Secret,

    token: otp,
    window: 1,
  });
};

module.exports = {
  generate2FASecret,
  verifyOTP,
};
