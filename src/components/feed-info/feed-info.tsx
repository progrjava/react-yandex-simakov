import { FC, useMemo } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
  selectAllOrders,
  selectTodayOrders,
  selectTotalOrders
} from '@selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectAllOrders);
  const total = useSelector(selectTotalOrders);
  const today = useSelector(selectTodayOrders);

  const [readyOrders, pendingOrders] = useMemo(
    () => [getOrders(orders, 'done'), getOrders(orders, 'pending')],
    [orders]
  );

  const feedStats = useMemo(
    () => ({
      total,
      totalToday: today
    }),
    [total, today]
  );

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feedStats}
    />
  );
};
