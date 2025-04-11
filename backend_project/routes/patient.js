import express from 'express';
import Patient from '../models/Patient.js';
import Notification from '../models/Notification.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Créer un patient
router.post('/patients', verifyToken, async (req, res) => {
  const { name, age, diseaseStage, medicalRecords, doctorId } = req.body;

  try {
    const patient = new Patient({ name, age, diseaseStage, medicalRecords, doctor: doctorId });
    await patient.save();

    // Notification si l'état est grave
    if (diseaseStage >= 4) {
      const notification = new Notification({
        message: `Patient ${name} dans un état critique (niveau ${diseaseStage})`,
        type: 'critical',
        doctor: doctorId
      });
      await notification.save();
    }

    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtenir tous les patients d'un médecin
// Obtenir tous les patients du médecin connecté
router.get('/patients', verifyToken, async (req, res) => {
    try {
      const patients = await Patient.find({ doctor: req.userId });
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des patients." });
    }
  });
  

// Mettre à jour un patient
router.put('/patients/:id', verifyToken, async (req, res) => {
  const { name, age, diseaseStage, medicalRecords } = req.body;

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { name, age, diseaseStage, medicalRecords },
      { new: true }
    );

    // Vérifier si la gravité change vers critique
    if (diseaseStage >= 4) {
      const notification = new Notification({
        message: `Mise à jour critique : patient ${name} est à un niveau ${diseaseStage}`,
        type: 'critical',
        doctor: updatedPatient.doctor
      }); 
      await notification.save();
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Supprimer un patient
router.delete('/patients/:id', verifyToken, async (req, res) => {
    try {
      const deleted = await Patient.findByIdAndDelete(req.params.id);
  
      if (!deleted) {
        return res.status(404).json({ message: "Patient non trouvé." });
      }
  
      res.status(200).json({ message: "Patient supprimé avec succès." });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression du patient." });
    }
  });
  

export default router;
