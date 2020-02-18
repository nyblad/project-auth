import React from 'react'
import styled from 'styled-components/macro'

const StyledButton = styled.button`
  font-family: 'Open Sans', sans-serif;
  height: 45px;
  min-width: 60px;
  border: 3px solid #fff;
  border-radius: 6px;
  background: rgba(0,0,0, 0.2);
  transition: 0.6s;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: rgba(0,0,0, 0.6);
  }
  &:focus {
    outline-color: #BC7C43;
    outline-offset: 5px;
  }
  @media (min-width: 450px) {
    font-size: 16px;
  }
  @media (min-width: 992px) {
    font-size: 20px;
    padding: 0 15px;
  }
`

export const Button = ({ onClick, title }) => (

  <StyledButton onClick={onClick}>{title}</StyledButton>

)

