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
  background: #829191;
`

export const App = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <RegistryForm />
            <LoginForm />
          </Route>

          <Route path="/secret">
            <SecretPage />
          </Route>

        </Switch>
      </BrowserRouter>

    </Wrapper>
  )
}
