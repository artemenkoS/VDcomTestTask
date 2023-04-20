import * as React from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../../App';

type Props = {
  children: React.ReactElement;
  redirectPath?: string;
};

export const ProtectedRoute: React.FC<Props> = ({ children, redirectPath = '/login' }: Props) => {
  const user = React.useContext(UserContext);

  return !user ? <Navigate to={redirectPath} replace /> : children;
};
