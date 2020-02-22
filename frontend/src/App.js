import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RegistryForm } from 'components/RegistryForm';
import { LoginForm } from 'components/LoginForm';
import { SecretPage } from 'pages/SecretPage';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #4c5b61;
`;
const Text = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #fff;
`;

export const App = () => {
  const [username, setUsername] = useState();
  return (
    <Wrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Text>Register a user</Text>
            <RegistryForm />
            <Text>Log in</Text>
            <LoginForm setUsername={setUsername} />
          </Route>

          <Route path="/secrets">
            <SecretPage username={username} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Wrapper>
  );
};
