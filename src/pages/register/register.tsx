import { FC, SyntheticEvent, useCallback, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { register } from '@slices';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setError('');
      try {
        await dispatch(register({ name, email, password })).then(() =>
          navigate('/login')
        );
      } catch {
        setError('Возникла ошибка при регистрации');
      }
    },
    [name, email, password, dispatch, navigate]
  );

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
