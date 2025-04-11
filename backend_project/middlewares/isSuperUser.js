export function isSuperUser(req, res, next) {
    if (!req.user || req.user.role !== 'superuser') {
      return res.status(403).json({ message: "Accès réservé au super utilisateur" });
    }
    next();
  }
  