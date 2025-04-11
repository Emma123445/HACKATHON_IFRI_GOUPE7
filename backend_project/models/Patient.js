import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  diseaseStage: { type: Number, required: true },
  medicalRecords: [{ type: String }], // Liste des antécédents médicaux
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
