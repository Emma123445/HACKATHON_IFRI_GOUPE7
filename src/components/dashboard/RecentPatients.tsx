import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const getStageColor = (stage: number) => {
  const colors = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-blue-100 text-blue-800',
    3: 'bg-yellow-100 text-yellow-800',
    4: 'bg-orange-100 text-orange-800',
    5: 'bg-red-100 text-red-800',
  };
  return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const RecentPatients = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/patients', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des patients', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Patients Récents</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/patients">
            Voir tous <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patients.map((patient) => (
            <div key={patient._id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
              <div>
                <div className="font-medium">{patient.fullName}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{patient.age} ans</span>
                  <span>•</span>
                  <Badge className={getStageColor(patient.diseaseStage)}>
                    Stade {patient.diseaseStage}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/patients/${patient._id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPatients;
