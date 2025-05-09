import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectUserOrders } from '@selectors';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
