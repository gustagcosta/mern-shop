import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const submitHandle = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Senha não coincidem');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name || user.name !== userInfo.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  return (
    <Row>
      <Col md={4}>
        <h2>Perfil</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {success && (
          <Message variant='success'>
            Informações atualizadas com sucesso
          </Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandle}>
          <Form.Group controlId={'name'}>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type='text'
              placeholder='Coloque o seu nome'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
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
          <Form.Group controlId={'confirmPassword'}>
            <Form.Label>Confirmação de senha</Form.Label>
            <Form.Control
              type='password'
              placeholder='Repita sua senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Atualizar dados
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h2>Meus pedidos</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
