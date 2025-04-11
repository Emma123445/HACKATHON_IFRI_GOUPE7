import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RecentPatients from '@/components/dashboard/RecentPatients';
import PatientDistribution from '@/components/dashboard/PatientDistribution';
import GFRTrends from '@/components/dashboard/GFRTrends';
import { Users, Activity, FileText, CalendarDays } from 'lucide-react';
import NewPatient from '@/components/patients/NewPatient';  // Importer le formulaire de création

const Dashboard = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);  // Gestion de l'affichage du formulaire

  const handleToggleForm = () => setIsFormVisible(!isFormVisible);

  return (
    <Layout title="Tableau de Bord"> 
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value="167"
          description="Patients enregistrés"
          icon={<Users />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="DFG Moyen"
          value="54 mL/min"
          description="Tous patients confondus"
          icon={<Activity />}
          trend={{ value: 1.8, isPositive: false }}
        />
        <StatCard
          title="Dossiers Actifs"
          value="142"
          description="Consultations régulières"
          icon={<FileText />}
          trend={{ value: 3.1, isPositive: true }}
        />
        <StatCard
          title="Rendez-vous"
          value="23"
          description="Planifiés cette semaine"
          icon={<CalendarDays />}
        />
      </div>
      
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <PatientDistribution />
        <GFRTrends />
      </div>
      
      <div className="mt-6">
        <RecentPatients />
      </div>

      {/* Button to toggle the form visibility */}
      <div className="mt-4">
        <button
          className="btn btn-primary"
          onClick={handleToggleForm}
        >
          Ajouter un Patient
        </button>
      </div>

      {/* Show the NewPatient form if the state is true */}
      {isFormVisible && <NewPatient />}
    </Layout>
  );
};

export default Dashboard;
