import React, { useState } from 'react';
import { Button, Input, Select, Option } from '@/components/ui';  // Assurez-vous que les composants UI sont disponibles

const NewPatient = () => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diseaseStage, setDiseaseStage] = useState(1);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const patientData = {
      fullName,
      age: parseInt(age),
      gender,
      diseaseStage,
    };

    try {
      const response = await fetch('http://localhost:3000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Assurez-vous d'utiliser le bon token
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        alert('Patient ajouté avec succès');
        // Réinitialisez les champs du formulaire si nécessaire
      } else {
        alert('Erreur lors de l\'ajout du patient');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input 
          type="text" 
          placeholder="Nom complet" 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)} 
        />
      </div>
      <div>
        <Input 
          type="number" 
          placeholder="Âge" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
        />
      </div>
      <div>
        <Select onChange={(e) => setGender(e.target.value)} value={gender}>
          <Option value="Homme">Homme</Option>
          <Option value="Femme">Femme</Option>
        </Select>
      </div>
      <div>
        <Select onChange={(e) => setDiseaseStage(parseInt(e.target.value))} value={diseaseStage}>
          <Option value={1}>Stade 1</Option>
          <Option value={2}>Stade 2</Option>
          <Option value={3}>Stade 3</Option>
          <Option value={4}>Stade 4</Option>
          <Option value={5}>Stade 5</Option>
        </Select>
      </div>
      <Button type="submit">Ajouter Patient</Button>
    </form>
  );
};

export default NewPatient;
