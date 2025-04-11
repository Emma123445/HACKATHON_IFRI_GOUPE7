
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';
import Logo from '@/components/layout/Logo';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mb-6">
        <Logo size="lg" />
      </div>
      
      <div className="mb-6 flex flex-col items-center">
        <FileQuestion className="h-24 w-24 text-muted-foreground" />
        <h1 className="mt-4 text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page non trouvée</h2>
      </div>
      
      <p className="mb-8 max-w-md text-muted-foreground">
        La page que vous recherchez n'existe pas ou a été déplacée. 
        Le chemin <span className="font-mono font-bold">{location.pathname}</span> n'est pas accessible.
      </p>
      
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link to="/dashboard">
            Tableau de bord
          </Link>
        </Button>
        <Button asChild>
          <Link to="/patients">
            Liste des patients
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
