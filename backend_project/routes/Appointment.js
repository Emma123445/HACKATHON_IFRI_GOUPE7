import express from 'express';
import Appointment from '../models/Appointment.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Créer un rendez-vous
router.post('/appointments', verifyToken, async (req, res) => {
  const { patient, doctor, date } = req.body;

  if (!patient || !doctor || !date) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const newAppointment = new Appointment({
      patient,
      doctor,
      date: new Date(date),
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du rendez-vous.', error: error.message });
  }
});

export default router;
