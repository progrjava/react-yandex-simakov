import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUser } from '@selectors';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
    const { name: userName } = useSelector(selectUser);
    return <AppHeaderUI userName={userName} />;
} 
