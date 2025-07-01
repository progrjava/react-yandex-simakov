import { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logout } from '@slices';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = useCallback(async () => {
    await dispatch(logout()).unwrap();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }, [dispatch]);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
