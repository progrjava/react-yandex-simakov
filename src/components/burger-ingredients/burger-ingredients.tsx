import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectAllIngredients } from '@selectors';

const INGREDIENTS = {
  bun: 'bun',
  main: 'main',
  sauce: 'sauce'
} as const;

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(selectAllIngredients);
  const [currentTab, setCurrentTab] = useState<TTabMode>(INGREDIENTS.bun);

  const titleRefs = {
    bun: useRef<HTMLHeadingElement>(null),
    main: useRef<HTMLHeadingElement>(null),
    sauce: useRef<HTMLHeadingElement>(null)
  };

  const filteredIngredients = useMemo(
    () => ({
      buns: ingredients.filter((i) => i.type === INGREDIENTS.bun),
      mains: ingredients.filter((i) => i.type === INGREDIENTS.main),
      sauces: ingredients.filter((i) => i.type === INGREDIENTS.sauce)
    }),
    [ingredients]
  );

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewMains] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) setCurrentTab(INGREDIENTS.bun);
    else if (inViewSauces) setCurrentTab(INGREDIENTS.sauce);
    else if (inViewMains) setCurrentTab(INGREDIENTS.main);
  }, [inViewBuns, inViewMains, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    titleRefs[tab as TTabMode].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={filteredIngredients.buns}
      mains={filteredIngredients.mains}
      sauces={filteredIngredients.sauces}
      titleBunRef={titleRefs.bun}
      titleMainRef={titleRefs.main}
      titleSaucesRef={titleRefs.sauce}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
