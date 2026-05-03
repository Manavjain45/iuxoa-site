// AuthContext — Base44 auth removed. Provides a no-op auth context.
import React, { createContext, useContext } from 'react';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoadingAuth: false,
  isLoadingPublicSettings: false,
  authError: null,
  logout: () => {},
  navigateToLogin: () => {},
});

export const AuthProvider = ({ children }) => <AuthContext.Provider value={AuthContext._currentValue}>{children}</AuthContext.Provider>;

export const useAuth = () => useContext(AuthContext);
