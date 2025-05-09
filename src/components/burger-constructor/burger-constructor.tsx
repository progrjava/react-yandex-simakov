import React, { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorBun,
  selectConstructorIngredients,
  selectLastOrder,
  selectIsOrderRequested,
  selectIsAuthenticated
} from '@selectors';
import { reset, createOrder, changeLastOrder, fetchFeeds } from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const isOrderRequested = useSelector(selectIsOrderRequested);
  const lastOrder = useSelector(selectLastOrder);

  const constructorItems = useMemo(
    () => ({
      bun: bun,
      ingredients: ingredients
    }),
    [bun, ingredients]
  );

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    if (!constructorItems.bun || isOrderRequested) return;
    const ingredientsId: string[] = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      )
    ];

    dispatch(createOrder(ingredientsId));
    dispatch(reset());
    dispatch(fetchFeeds());
  };

  const closeOrderModal = () => dispatch(changeLastOrder(null));

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isOrderRequested}
      constructorItems={constructorItems}
      orderModalData={lastOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
