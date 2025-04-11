
import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="w-64 rounded-full bg-background pl-8 md:w-80 lg:w-96"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-medical-primary text-[10px] text-white">
            3
          </span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 font-normal"
        >
          <span className="h-8 w-8 rounded-full bg-medical-primary text-primary-foreground">
            <span className="flex h-full w-full items-center justify-center text-xs font-medium">
              MD
            </span>
          </span>
          <span className="hidden md:inline-block">Dr. Martin</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
