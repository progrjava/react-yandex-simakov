import { FC, memo, useCallback } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { moveIngredient, removeIngredient } from '@slices';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMove = useCallback(
      (direction: 'up' | 'down') => {
        dispatch(moveIngredient({ id: ingredient.id, direction }));
      },
      [dispatch, ingredient.id]
    );

    const handleClose = useCallback(() => {
      dispatch(removeIngredient(ingredient.id));
    }, [dispatch, ingredient.id]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={() => handleMove('up')}
        handleMoveDown={() => handleMove('down')}
        handleClose={handleClose}
      />
    );
  }
);
