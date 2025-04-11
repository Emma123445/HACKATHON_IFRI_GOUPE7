
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from './AppSidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header title={title} />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
          <footer className="border-t p-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} NephroTrack - Gestion de Maladie Rénale Chronique
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
