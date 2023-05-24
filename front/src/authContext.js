import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
      } else {
        setUser(decodedToken);
      }
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('jwtToken', userData.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
  };

  const authContextData = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
