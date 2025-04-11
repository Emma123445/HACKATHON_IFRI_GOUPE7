
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Sample data for kidney disease stages
const data = [
  { name: 'Stade 1', value: 12, color: '#10b981' },
  { name: 'Stade 2', value: 23, color: '#3b82f6' },
  { name: 'Stade 3', value: 38, color: '#f59e0b' },
  { name: 'Stade 4', value: 18, color: '#f97316' },
  { name: 'Stade 5', value: 9, color: '#ef4444' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border rounded-md shadow-sm">
        <p className="font-medium">{`${payload[0].name} : ${payload[0].value} patients`}</p>
        <p className="text-xs text-muted-foreground">{`${Math.round((payload[0].value / 100) * 100)}% du total`}</p>
      </div>
    );
  }
  return null;
};

const PatientDistribution = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution des Patients par Stade</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
          {data.map((stage) => (
            <div key={stage.name}>
              <div 
                className="h-3 w-full rounded-full mb-1" 
                style={{ backgroundColor: stage.color }}
              ></div>
              <span className="font-medium">{stage.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientDistribution;
