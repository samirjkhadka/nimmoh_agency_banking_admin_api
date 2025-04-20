const nodemailer = require("nodemailer");
const { service, emailUser, emailPass } = require("../config/mail");

const transporter = nodemailer.createTransport({
  service: service,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

const sendPasswordResetEmail = async (toEmail, tempPassword) => {
  const mailOptions = {
    from: emailUser,
    to: toEmail,
    subject: "Temporary Password - Admin -Nimmoh Agency Banking",
    html: `<p>Hi there! Your temporary password is: ${tempPassword}</p><p>Please use this password to log in to your account.</p>`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to user: ${toEmail}`, info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const send2FAEmail = async (toEmail, twoFAcode) => {
  const mailOptions = {
    from: emailUser,
    to: toEmail,
    subject: "2FA Verification - Nimmoh Agency Banking",
    html: `<p>Hi there! Please use the following code to verify your account:</p><p>Code: <strong>${twoFAcode}</strong></p>`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to user: ${toEmail}`, info.response);
  } catch (error) {
    console.error("Error sending 2FA email:", error);
  }
};

module.exports = { sendPasswordResetEmail, send2FAEmail };
