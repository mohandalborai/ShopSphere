import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Basic hash function for demonstration purposes
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // In a real app, this would be an API call
    const savedUser = localStorage.getItem('user_db_' + email);
    if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.passwordHash === simpleHash(password)) {
             const userData = {
                email: user.email,
                name: user.name
             };
             setUser(userData);
             localStorage.setItem('user', JSON.stringify(userData));
             return { success: true };
        }
    }
    
    // Fallback for legacy test user if needed, or just fail
    // Keeping simple for this refactor without a real backend
    // For demo purposes, we'll allow any login if we don't have a backend
    // In a real app, this would validate against a server
    // For now, we fall back to check if we can find them in local storage simulation
    // or just return error
    
    // NOTE: Removed hardcoded 'test@example.com' credentials for security best practices.
    // Use the register flow to create an account for testing.

    return { success: false, error: 'Invalid email or password' };
  };

  const register = (name, email, password) => {
    // Basic password strength validation
    if (password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    const passwordHash = simpleHash(password);
    const userDbEntry = { name, email, passwordHash };
    
    // Simulate DB storage
    localStorage.setItem('user_db_' + email, JSON.stringify(userDbEntry));

    const userData = { email, name };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
