import { FC } from 'react';
import { IngredientDetailsUI, Preloader } from '@ui';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectAllIngredients } from '@selectors';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const location = useLocation();
  const ingredients = useSelector(selectAllIngredients);

  const ingredientId = location.pathname.replace('/ingredients/', '');
  const ingredientData = ingredients.find(
    (ingredient: TIngredient) => ingredient._id === ingredientId
  )!;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
