const pool = require("../config/dbConfig");

const getAdminByUsername = async (username) => {
  const result = await pool.query(
    "SELECT * FROM admin_users WHERE username = $1  And status = 'active'",
    [username]
  );
  return result.rows[0];
};

const updateAdminLoginInfo = async (adminId, lastLogin, token) => {
  await pool.query(
    `UPDATE admin_users SET last_login = $1, session_token = $2 WHERE id = $3`,
    [lastLogin, token, adminId]
  );
};

module.exports = { getAdminByUsername, updateAdminLoginInfo };
