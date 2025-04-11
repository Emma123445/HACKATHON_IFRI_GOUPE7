import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 
import authRoutes from './routes/auth.js';
import patientRoutes from './routes/patient.js';
import registerDoctorRoute from './routes/registerDoctor.js';
import appointmentRoutes from './routes/Appointment.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:8081', 'http://localhost:5173', 'http://localhost:3000', 'https://ton-site-netlify.netlify.app'],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes); 
app.use('/api', patientRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api', registerDoctorRoute);
app.use('/api', appointmentRoutes); // Ajout de la route des rendez-vous 


// Connexion à MongoDB
connectDB();

app.listen(PORT, () => console.log(`Backend lancé sur http://localhost:${PORT}`));
