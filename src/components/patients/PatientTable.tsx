import { useEffect } from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Filter, Plus, Search } from 'lucide-react';

// Mock patient data
const mockPatients = [
  { 
    id: 1, 
    name: 'Robert Dupont', 
    age: 67, 
    sex: 'M', 
    gfr: 45, 
    stage: 3, 
    createdAt: '14/01/2023',
    lastVisit: '14/06/2023', 
    status: 'Stable' 
  },
  { 
    id: 2, 
    name: 'Marie Laurent', 
    age: 54, 
    sex: 'F', 
    gfr: 65, 
    stage: 2, 
    createdAt: '05/02/2023',
    lastVisit: '02/06/2023', 
    status: 'En amélioration' 
  },
  { 
    id: 3, 
    name: 'Jean Moreau', 
    age: 72, 
    sex: 'M', 
    gfr: 28, 
    stage: 4, 
    createdAt: '22/02/2023',
    lastVisit: '22/05/2023', 
    status: 'Surveillance' 
  },
  { 
    id: 4, 
    name: 'Sophie Petit', 
    age: 60, 
    sex: 'F', 
    gfr: 52, 
    stage: 3, 
    createdAt: '18/03/2023',
    lastVisit: '18/05/2023', 
    status: 'Stable' 
  },
  { 
    id: 5, 
    name: 'Philippe Martin', 
    age: 58, 
    sex: 'M', 
    gfr: 75, 
    stage: 2, 
    createdAt: '25/03/2023',
    lastVisit: '10/05/2023', 
    status: 'Stable' 
  },
  { 
    id: 6, 
    name: 'Claire Bernard', 
    age: 69, 
    sex: 'F', 
    gfr: 18, 
    stage: 4, 
    createdAt: '02/04/2023',
    lastVisit: '07/05/2023', 
    status: 'Surveillance' 
  },
  { 
    id: 7, 
    name: 'André Durand', 
    age: 77, 
    sex: 'M', 
    gfr: 12, 
    stage: 5, 
    createdAt: '15/04/2023',
    lastVisit: '01/05/2023', 
    status: 'Critique' 
  },
  { 
    id: 8, 
    name: 'Isabelle Richard', 
    age: 51, 
    sex: 'F', 
    gfr: 82, 
    stage: 2, 
    createdAt: '28/04/2023',
    lastVisit: '28/04/2023', 
    status: 'Stable' 
  },
];

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

const getStatusVariant = (status: string) => {
  const variants = {
    'Stable': 'outline',
    'En amélioration': 'secondary',
    'Surveillance': 'default',
    'Critique': 'destructive'
  };
  return variants[status as keyof typeof variants] || 'default';
};

const PatientTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState(mockPatients);
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un patient..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Patient
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Âge/Sexe</TableHead>
              <TableHead>DFG</TableHead>
              <TableHead>Stade MRC</TableHead>
              <TableHead>Dernier Suivi</TableHead>
              <TableHead>État</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Aucun patient trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">
                    {patient.name}
                  </TableCell>
                  <TableCell>
                    {patient.age} ans • {patient.sex}
                  </TableCell>
                  <TableCell>
                    {patient.gfr} mL/min
                  </TableCell>
                  <TableCell>
                    <Badge className={getStageColor(patient.stage)}>
                      Stade {patient.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(patient.status)}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/patients/${patient.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientTable;
