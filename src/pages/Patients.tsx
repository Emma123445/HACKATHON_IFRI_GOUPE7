import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

interface Patient {
  _id: string;
  fullName: string;
  age: number;
  gender: string;
  diseaseStage: number;
}

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des patients :", error);
      }
    };

    fetchPatients();
  }, []);

  const getStageColor = (stage: number) => {
    if (stage >= 4) return "text-red-600 font-bold";
    if (stage === 3) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Patients</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <Card key={patient._id}>
            <CardContent className="p-4">
              <p className="font-semibold">{patient.fullName}</p>
              <p>Âge : {patient.age}</p>
              <p>Sexe : {patient.gender}</p>
              <p className={getStageColor(patient.diseaseStage)}>
                Stade : {patient.diseaseStage}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


