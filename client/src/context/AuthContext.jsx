// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("foodshare_user")) || null
//   );

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("foodshare_user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("foodshare_user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage or an empty state
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Simple function to handle successful login
  const login = (userData) => {
    // Save user data (including token from backend) and update state
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Simple function to handle logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const authContextValue = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};