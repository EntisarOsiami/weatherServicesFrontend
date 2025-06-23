import React from 'react';
import { Navigate } from 'react-router';
import { isAuthenticated } from '../services/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
