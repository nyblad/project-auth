import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Button } from 'components/Button';

const Form = styled.form`
  margin: 15px 0;
  width: 90%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  @media (min-width: 668px) {
    width: 80%;
    padding: 20px 40px;
  }
  @media (min-width: 800px) {
    width: 60%;
  }
  @media (min-width: 992px) {
    width: 50%;
  }
`;
const Label = styled.label`
  width: 100%;
  padding: 5px 0;
`;
const LabelText = styled.p`
  margin: 15px 0 8px 0;
  font-size: 16px;
  font-weight: bold;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
`;

const LoginFailed = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;

export const LoginForm = ({ setUsername }) => {
  const history = useHistory();
  const [loginFailed, setLoginFailed] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const clearInputs = () => {
    setFormValues({
      email: '',
      password: ''
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    localStorage.removeItem('accessToken');

    fetch('http://localhost:8080/sessions', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.status !== 200) {
          // console.log(
          //   'Looks like there was a problem. Status Code: ' + response.status
          // );
          setLoginFailed(true);
          return;
        }

        response.json().then(data => {
          if (data.notFound !== true) {
            localStorage.setItem('accessToken', data.accessToken);
            setUsername(data.name);
            clearInputs();
            setLoginFailed(false);
            history.push('/secrets');
          } else {
            setLoginFailed(true);
            clearInputs();
          }
        });
      })
      .catch(err => {
        console.log('Fetch Error :shit:', err);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {loginFailed && <LoginFailed>Login failed</LoginFailed>}
      <Label>
        <LabelText>E-mail</LabelText>
        <Input
          onChange={event =>
            setFormValues({ ...formValues, email: event.target.value })
          }
          value={formValues.email}
          type="email"
          placeholder="mail@mail.com"
          minLength="2"
          maxLength="50"
          required
        />
      </Label>

      <Label>
        <LabelText>Password</LabelText>
        <Input
          onChange={event =>
            setFormValues({ ...formValues, password: event.target.value })
          }
          value={formValues.password}
          type="password"
          placeholder="**********"
          required
        />
      </Label>
      <Button type="submit" title="Login" />
    </Form>
  );
};
