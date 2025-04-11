import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js'; // ← pour récupérer le rôle du docteur

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Format: Bearer TOKEN

  if (!token) {
    return res.status(403).json({ message: 'Token manquant. Accès refusé.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // On récupère le médecin complet pour l’ajouter à req.user
    const doctor = await Doctor.findById(decoded.id);
    if (!doctor) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    req.user = doctor; // ⚠️ Stocke tout l'objet du médecin
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};

