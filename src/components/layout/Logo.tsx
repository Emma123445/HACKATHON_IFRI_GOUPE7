
import React from 'react';
import { Activity } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  vertical?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', vertical = false }) => {
  const sizeClass = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} items-center gap-2 font-bold ${sizeClass}`}>
      <Activity className="text-medical-accent" />
      <div>
        <span className="text-medical-primary">Nephro</span>
        <span className="text-medical-accent">Track</span>
      </div>
    </div>
  );
};

export default Logo;
