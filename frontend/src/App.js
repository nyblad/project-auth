import React from 'react'
import styled from 'styled-components/macro'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { RegistryForm } from 'components/RegistryForm'
import { LoginForm } from 'components/LoginForm'
import { SecretPage } from 'pages/SecretPage'

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #4C5B61;
`
const Text = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #fff;
`

export const App = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Text>Register a user</Text>
            <RegistryForm />
            <Text>Log in</Text>
            <LoginForm />
          </Route>

          <Route path="/secrets">
            <SecretPage />
          </Route>

        </Switch>
      </BrowserRouter>

    </Wrapper>
  )
}
