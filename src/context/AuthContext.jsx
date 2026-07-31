import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('itp_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (!parsed.gender) parsed.gender = 'male';
        setUser(parsed);
        setIsLoggedIn(true);
      } catch (e) {
        localStorage.removeItem('itp_user');
      }
    }
  }, []);

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
  return useContext(AuthContext);
}
