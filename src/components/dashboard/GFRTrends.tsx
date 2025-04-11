
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

// Sample data for GFR trends over time
const data = [
  { month: 'Jan', gfr: 65 },
  { month: 'Fév', gfr: 62 },
  { month: 'Mar', gfr: 58 },
  { month: 'Avr', gfr: 57 },
  { month: 'Mai', gfr: 59 },
  { month: 'Juin', gfr: 55 },
  { month: 'Juil', gfr: 52 },
  { month: 'Août', gfr: 48 },
  { month: 'Sep', gfr: 45 },
  { month: 'Oct', gfr: 48 },
  { month: 'Nov', gfr: 46 },
  { month: 'Déc', gfr: 44 },
];

// GFR stage reference lines
const gfrStages = [
  { value: 90, stage: '1', color: '#10b981' },
  { value: 60, stage: '2', color: '#3b82f6' },
  { value: 30, stage: '3', color: '#f59e0b' },
  { value: 15, stage: '4', color: '#f97316' },
  { value: 0, stage: '5', color: '#ef4444' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const gfrValue = payload[0].value;
    let stage = 1;
    
    if (gfrValue < 15) stage = 5;
    else if (gfrValue < 30) stage = 4;
    else if (gfrValue < 60) stage = 3;
    else if (gfrValue < 90) stage = 2;
    
    return (
      <div className="bg-background p-2 border rounded-md shadow-sm">
        <p className="font-medium">{`${label}: ${gfrValue} mL/min/1.73m²`}</p>
        <p className="text-xs text-muted-foreground">{`Stage MRC: ${stage}`}</p>
      </div>
    );
  }
  return null;
};

const GFRTrends = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendances DFG Moyennes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis
                domain={[0, 100]}
                label={{ 
                  value: 'DFG (mL/min/1.73m²)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* GFR stage reference lines */}
              {gfrStages.map((stage, index) => (
                <ReferenceLine
                  key={index}
                  y={stage.value}
                  stroke={stage.color}
                  strokeDasharray="3 3"
                  label={{
                    value: `Stade ${stage.stage}`,
                    position: 'right',
                    fill: stage.color,
                    fontSize: 10,
                  }}
                />
              ))}
              
              <Line
                type="monotone"
                dataKey="gfr"
                stroke="#0070b6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>DFG moyen sur l'ensemble des patients suivis en 2023</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GFRTrends;
