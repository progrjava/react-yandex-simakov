import { FC, useEffect, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import {
  selectCurrentOrder,
  selectIsOrderFound,
  selectAllIngredients
} from '@selectors';
import { fetchOrderByNumber } from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import { OrderInfoUI, Preloader } from '@ui';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();
  const currentNumber = Number(number);
  const isOrderFound = useSelector(selectIsOrderFound);
  const orderData = useSelector(selectCurrentOrder);
  const ingredients = useSelector(selectAllIngredients);

  useEffect(() => {
    dispatch(fetchOrderByNumber(currentNumber));
  }, [currentNumber, dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            const count = ingredient.type === 'bun' ? 2 : 1;
            acc[item] = {
              ...ingredient,
              count: count
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date: new Date(orderData.createdAt),
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || !isOrderFound) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
