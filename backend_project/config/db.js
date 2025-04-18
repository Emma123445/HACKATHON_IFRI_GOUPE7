// config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connecté à MongoDB");
  } catch (err) {
    console.error(" Erreur de connexion :", err.message);
    process.exit(1);
  }
};

export default connectDB;
