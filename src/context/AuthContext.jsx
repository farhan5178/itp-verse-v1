import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('itp_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (!parsed.gender) parsed.gender = 'male';
        return parsed;
      }
    } catch (e) {
      localStorage.removeItem('itp_user');
    }
    return null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return !!localStorage.getItem('itp_user');
    } catch (e) {
      return false;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = (userData = { name: 'Alex Johnson', email: 'alex@example.com', targetExam: 'IELTS', targetScore: '8.0', gender: 'male' }) => {
    const userWithGender = { gender: 'male', ...userData };
    setUser(userWithGender);
    setIsLoggedIn(true);
    localStorage.setItem('itp_user', JSON.stringify(userWithGender));
    setIsAuthModalOpen(false);
  };

  const setGender = (newGender) => {
    setUser((prev) => {
      if (!prev) return { name: 'Alex Johnson', gender: newGender };
      const updated = { ...prev, gender: newGender };
      localStorage.setItem('itp_user', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('itp_user');
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        setGender,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      isLoggedIn: false,
      user: null,
      login: () => {},
      logout: () => {},
      setGender: () => {},
      isAuthModalOpen: false,
      openAuthModal: () => {},
      closeAuthModal: () => {},
    };
  }
  return context;
}
