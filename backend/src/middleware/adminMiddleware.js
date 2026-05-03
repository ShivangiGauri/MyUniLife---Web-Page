export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden: Admin access only" });
  }
  next();
};

export const verifyUniversityScope = (req, res, next) => {
  if (!req.user || !req.user.universityId) {
    return res.status(403).json({ success: false, message: "Forbidden: No university scope found" });
  }
  next();
};
