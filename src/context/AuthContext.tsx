'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../firebaseConfig'; // Importe a instância de autenticação
import { User } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  auth: typeof auth; // Exponha a instância auth
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe; // Limpa o listener ao desmontar o componente
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};