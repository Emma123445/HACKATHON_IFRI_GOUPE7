
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-medical-light to-white">
      <header className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo size="md" />
        <Button onClick={() => navigate('/login')}>
          Connexion
        </Button>
      </header>
      
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-medical-primary md:text-5xl lg:text-6xl">
            Plateforme de Gestion <span className="text-medical-accent">Maladie Rénale Chronique</span>
          </h1>
          
          <p className="mt-6 text-lg text-gray-600 md:text-xl">
            Solution médicale complète pour le suivi et la gestion des patients atteints de MRC.
            Accès réservé aux professionnels de santé.
          </p>
          
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              size="lg" 
              className="bg-medical-primary hover:bg-medical-primary/90"
              onClick={() => navigate('/login')}
            >
              Accéder à la plateforme
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/login')}
            >
              Demander un accès
            </Button>
          </div>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
            <div className="mb-4 rounded-full bg-medical-light p-3 inline-block">
              <Activity className="h-6 w-6 text-medical-accent" />
            </div>
            <h3 className="text-xl font-semibold">Suivi clinique</h3>
            <p className="mt-2 text-gray-600">
              Suivi personnalisé pour chaque patient avec historique complet.
            </p>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
            <div className="mb-4 rounded-full bg-medical-light p-3 inline-block">
              <BarChart className="h-6 w-6 text-medical-accent" />
            </div>
            <h3 className="text-xl font-semibold">Analyse des données</h3>
            <p className="mt-2 text-gray-600">
              Visualisation des tendances et évolution de la maladie.
            </p>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
            <div className="mb-4 rounded-full bg-medical-light p-3 inline-block">
              <FileText className="h-6 w-6 text-medical-accent" />
            </div>
            <h3 className="text-xl font-semibold">Gestion des dossiers</h3>
            <p className="mt-2 text-gray-600">
              Organisation sécurisée des informations médicales.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-medical-primary py-6 text-center text-white">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} NephroTrack - Plateforme professionnelle pour la gestion de la MRC</p>
          <p className="mt-2 text-sm">Accès réservé aux professionnels de santé autorisés</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

// Missing imports
import { Activity, BarChart, FileText } from 'lucide-react';
