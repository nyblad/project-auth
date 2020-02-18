import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Button } from 'components/Button'

const Form = styled.form`
  margin: 15px 0;
  width: 90%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255, 0.4);
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
`
const Label = styled.label`
  width: 100%;
  padding: 5px 0;
`
const LabelText = styled.p`
  margin: 15px 0 8px 0;
  font-size: 16px;
  font-weight: bold;
`
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
`

export const RegistryForm = () => {

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const clearInputs = () => {
    setFormValues({
      name: '',
      email: '',
      password: '',
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    clearInputs()
    window.alert(`Registry done for ${formValues.name}`)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        <LabelText>Name</LabelText>
        <Input
          onChange={event => setFormValues({ ...formValues, name: event.target.value })}
          value={formValues.name}
          type="text"
          placeholder="Your name"
          minLength="2"
          maxLength="50"
          required
        />
      </Label>

      <Label>
        <LabelText>E-mail</LabelText>
        <Input
          onChange={event => setFormValues({ ...formValues, email: event.target.value })}
          value={formValues.email}
          type="text"
          placeholder="mail@mail.com"
          minLength="2"
          maxLength="50"
          required
        />
      </Label>

      <Label>
        <LabelText>Choose password</LabelText>
        <Input
          onChange={event => setFormValues({ ...formValues, password: event.target.value })}
          value={formValues.password}
          type="password"
          placeholder="**********"
          minLength="5"
          maxLength="50"
          required
        />
      </Label>
      <Button type="submit" title='Register' />

    </Form>
  )
}