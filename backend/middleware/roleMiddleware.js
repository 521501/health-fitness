/**
 * Restrict access to specific roles
 * @param {...string} roles - Allowed roles (User, Trainer, Admin)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user?.role || 'none'}) is not authorized to access this route`,
      });
    }
    next();
  };
};

module.exports = { authorize };