import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Home } from './features/Home/Home';
import { Login } from './features/Login/Login';
import { CircularProgress } from '@mui/material';
import { PreloaderWrap } from './styled';
import { IUser } from './types';
import { useUserData } from './hooks/useUserData';

export const UserContext = React.createContext<IUser | null>(null);

export const App = () => {
  const userData = useUserData();

  /* TODO: preloader */
  if (userData.isLoading) {
    return (
      <PreloaderWrap>
        <CircularProgress />
      </PreloaderWrap>
    );
  }

  return (
    <UserContext.Provider value={userData.data ?? null}>
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContext.Provider>
  );
};
