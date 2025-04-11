import express from 'express';
import Doctor from '../models/Doctor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email });
  if (!doctor) return res.status(401).json({ message: 'Compte inexistant' });

  const isMatch = await bcrypt.compare(password, doctor.password); 
  if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

  const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({
    token,
    doctor: {
      id: doctor._id,
      email: doctor.email,
      name: doctor.name,
      isFirstLogin: doctor.isFirstLogin,
    }
  });
});

//router change-password
router.post('/change-password', async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: "Médecin introuvable." });
    }

    const isMatch = await bcrypt.compare(currentPassword, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe actuel incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    doctor.password = hashedPassword;
    doctor.isFirstLogin = false;
    await doctor.save();

    res.json({ message: "Mot de passe changé avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

export default router;
