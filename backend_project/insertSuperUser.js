import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'; // Pour hasher le mot de passe
import Doctor from './models/Doctor.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connexion à MongoDB réussie');

    // Création du super utilisateur
    const superUser = new Doctor({
      email: 'admin@doctor.com',
      password: await bcrypt.hash('TempPassword123', 10), // Hash du mot de passe temporaire
      name: 'Dr. John Doe',
    });

    await superUser.save();
    console.log('Super utilisateur créé avec succès');
    
    mongoose.disconnect();
  })
  .catch((err) => console.error('Erreur MongoDB', err));
