const {pool} = require("../config/dbConfig");

const getAdminByUsername = async (email) => {
  const result = await pool.query(
    "SELECT * FROM admin_users WHERE email = $1  And is_active = 'true'",
    [email]
  );
  return result.rows[0];
};
const getAdminById = async (admin_id) => {
  const result = await pool.query(
    "SELECT * FROM admin_users WHERE id = $1  And is_active = 'true'",
    [admin_id]
  );
  return result.rows[0];
};

const updateAdminLoginInfo = async (adminId,  token) => {
  console.log(adminId,token);
  await pool.query(
    `UPDATE admin_users SET  two_fa_secret = $1 WHERE id = $2`,
    [ token, adminId]
  );
};

module.exports = { getAdminByUsername,getAdminById, updateAdminLoginInfo };
