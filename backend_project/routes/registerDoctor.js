import express from 'express';
import Doctor from '../models/Doctor.js';
import bcrypt from 'bcryptjs';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { isSuperUser } from '../middlewares/isSuperUser.js';

const router = express.Router();

router.post('/register-doctor', verifyToken, isSuperUser, async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Un médecin avec cet email existe déjà." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new Doctor({
      email,
      password: hashedPassword,
      name,
      role: 'doctor', // par défaut
    });

    await newDoctor.save();
    res.status(201).json({ message: "Médecin créé avec succès." });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du médecin." });
  }
});

export default router;
