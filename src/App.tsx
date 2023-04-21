import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { IUser } from './types';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Home } from './features/Home/Home';
import { Login } from './features/Login/Login';

export const UserContext = React.createContext<IUser | null>(null);

export const App = () => {
  const [user, setUser] = React.useState<IUser | null>(null);

  const handleLogin = () => {
    setUser({
      id: '1',
      name: 'Mr. Director',
      position: 'Managing Director',
    });
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
