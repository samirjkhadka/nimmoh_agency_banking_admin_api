const db = require("../config/dbConfig");

const logActivity = async (req, res, next) => {
  const userId = req.user.id || null;
  const { method, originURL } = req;

  try {
    await db.query(
      `INSERT INTO activity_logs (user_id, method, endpoint, timestamp) VALUES ($1, $2, $3, NOW())`,
      [userId, method, originURL]
    );
  } catch (error) {
    console.error("Error logging activity:", error);
  }
  next();
};

module.exports = { logActivity };
