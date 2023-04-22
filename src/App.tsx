import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Home } from './features/Home/Home';
import { Login } from './features/Login/Login';
import { IUser } from './types';

export const UserContext = React.createContext<IUser | null>(null);

export const App = () => {
  const navigate = useNavigate();

  const [user, setUser] = React.useState<IUser | null>(null);

  const handleLogin = (user: IUser) => {
    setUser(user);
    navigate('/');
  };

  const handleLogout = () => setUser(null);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <UserContext.Provider value={user}>
            <ProtectedRoute>
              <Home onLogout={handleLogout} />
            </ProtectedRoute>
          </UserContext.Provider>
        }
      />
      <Route path="/login" element={<Login onSuccess={handleLogin} />} />
    </Routes>
  );
};
