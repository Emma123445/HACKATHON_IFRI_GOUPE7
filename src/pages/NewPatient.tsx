import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewPatient() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState("Homme");
  const [diseaseStage, setDiseaseStage] = useState<number>(1);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/patients",
        {
          fullName,
          age,
          gender,
          diseaseStage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/patients");
    } catch (error) {
      console.error("Erreur lors de la création du patient :", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nouveau Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom complet"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Âge"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
        </select>
        <select
          value={diseaseStage}
          onChange={(e) => setDiseaseStage(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          <option value={1}>Stade 1</option>
          <option value={2}>Stade 2</option>
          <option value={3}>Stade 3</option>
          <option value={4}>Stade 4</option>
          <option value={5}>Stade 5</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
