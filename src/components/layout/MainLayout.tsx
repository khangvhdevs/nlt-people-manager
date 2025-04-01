
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/pages/auth/LoginPage';
import { Toaster } from '@/components/ui/toaster';
import Chatbot from '@/components/chatbot/Chatbot';

const MainLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      
      <div className="flex-1 md:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="container mx-auto p-6">
          <Outlet />
        </main>
      </div>
      
      <Chatbot />
      <Toaster />
    </div>
  );
};

export default MainLayout;
