import React from 'react'
import styled from 'styled-components/macro'
import { Button } from 'components/Button'

const Wrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #4C5B61;
`
const Text = styled.p`
  font-size: 18px;
  color: #fff;
`

export const SecretPage = () => {

  const handleLogout = () => {
    window.alert('Now you should be logged out and redirected to start page')
  }

  return (
    <Wrapper>
      <Text>Welcome to the secret page.</Text>
      <Button onClick={handleLogout} title='Log out' />
    </Wrapper>
  )
}