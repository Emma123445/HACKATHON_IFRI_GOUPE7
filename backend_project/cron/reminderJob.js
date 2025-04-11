import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Appointment from '../models/Appointment.js';
import Notification from '../models/Notification.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Chargement correct du .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default async function reminderJob() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[CRON] Connecté à MongoDB');

    // On définit l'heure actuelle
    const now = new Date();

    // On vérifie les rendez-vous dans les prochaines minutes (ici 1 heure)
    const upcoming = new Date(now.getTime() + 60 * 1000); // 1 minute après l'heure actuelle

    console.log('Current time:', now.toISOString());
    console.log('Upcoming time:', upcoming.toISOString());

    // Recherche les rendez-vous dans la plage horaire
    const appointments = await Appointment.find({
      date: { $gte: now.toISOString(), $lte: upcoming.toISOString() }
    });

    console.log(`[CRON] ${appointments.length} rendez-vous à venir dans l'heure.`);

    // Créer des notifications pour chaque rendez-vous trouvé
    for (const appt of appointments) {
      const notif = new Notification({
        doctor: appt.doctor,
        message: `Rappel : Rendez-vous avec ${appt.patient} à ${appt.date.toLocaleTimeString()}`,
      });
      await notif.save();
    }

    console.log('[CRON] Notifications enregistrées.'); 
    await mongoose.disconnect();
  } catch (error) { 
    console.error('[CRON] Erreur:', error.message);
  }
}
