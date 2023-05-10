import { Button, Container, TextField } from '@mui/material';
import { Stack } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/studentActions';
import './LoginStyle.css';
import { useNavigate } from 'react-router-dom';

function Rightsect() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(login(email, password));
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className='right-sect'>
      <Container>
        <Stack spacing={5}>
          <h2>Вход</h2>

          {error && <div>{error}</div>}
          {loading && <div>Загрузка...</div>}

          <form onSubmit={handleSubmit}>
            <TextField
              label='Email'
              type='email'
              variant='filled'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label='Пароль'
              type='password'
              variant='filled'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' variant='contained'>
              Войти
            </Button>
          </form>
        </Stack>
      </Container>
    </div>
  );
}

export default Rightsect;
