import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  return (
    <FormContainer>
      <h1>Entrar</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandle}>
        <Form.Group controlId={'email'}>
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type='email'
            placeholder='Coloque o seu e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId={'password'}>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type='password'
            placeholder='Coloque a sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Entrar
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Novo por aqui?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Registre-se
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
