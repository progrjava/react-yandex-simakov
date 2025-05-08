import { FC } from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsLoading,
  selectIsAuthenticated
} from '../../services/selectors/user';
import { Preloader } from '@ui';
import { ProtectedRouteProps } from '@utils-types';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const location = useLocation();
  const isLoading = useSelector(selectIsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const getRedirectElement = () => {
    if (!isAuthenticated && !onlyUnAuth) {
      return <Navigate replace to={'/login'} state={{ from: location }} />;
    }
    if (isAuthenticated && onlyUnAuth) {
      const redirectTo = location.state?.from || { pathname: '/' };
      return <Navigate replace to={redirectTo} />;
    }
    return children;
  };

  if (isLoading) {
    return <Preloader />;
  }
  return getRedirectElement();
};
