const db = require("../config/dbConfig");

const checkPermission = (permissionKey) => {
  return async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
      const [roles] = await db.query(
        `
        SELECT p.permission_key FROM users u
        JOIN roles r ON u.role_id = r.id
        JOIN role_permissions rp ON r.id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE u.id = $1
      `,
        [userId]
      );

      const hasPermission = roles.some(
        (r) => r.permission_key === permissionKey
      );
      if (!hasPermission) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      next();
    } catch (error) {
      console.error("Error checking permission:", error);
      return res
        .status(500)
        .json({ success: false, message: "Permission check failed" });
    }
  };
};

module.exports = { checkPermission };
