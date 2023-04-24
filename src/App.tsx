import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Home } from './features/Home/Home';
import { Login } from './features/Login/Login';
import { IUser } from './types';

export const UserContext = React.createContext<IUser | null>(null);

const fetchUser = () => fetch('/user').then((response) => response.json());
const logout = () => fetch('/logout', { method: 'POST' }).then((response) => response.json());

export const App = () => {
  const [user, setUser] = React.useState<IUser | null>(null);

  const navigate = useNavigate();
  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      setUser(null);
      navigate('/login');
    },
    onError: () => {
      console.log('there was an error');
    },
  });

  const userData = useQuery<IUser>({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: 0,
  });

  const handleLogout = () => {
    mutate();
  };

  /* TODO: preloader */
  if (userData.isLoading) {
    return null;
  }

  return (
    <UserContext.Provider value={userData.data ?? user}>
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Home onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login onSignin={setUser} />} />
      </Routes>
    </UserContext.Provider>
  );
};
