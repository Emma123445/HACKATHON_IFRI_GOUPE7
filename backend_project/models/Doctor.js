import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'superuser' }, // Par défaut un super utilisateur
  isFirstLogin: { type: Boolean, default: true }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
