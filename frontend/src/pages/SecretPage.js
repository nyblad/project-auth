import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Button } from 'components/Button';

const Wrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #4c5b61;
`;
const Text = styled.p`
  font-size: 18px;
  color: #fff;
`;

export const SecretPage = () => {
  const [shows, setShows] = useState();
  const accessToken = localStorage.getItem('accessToken');

  const handleLogout = () => {
    window.alert('Now you should be logged out and redirected to start page');
    localStorage.removeItem('accessToken');
  };

  useEffect(() => {
    const abortController = new AbortController();

    fetch('http://localhost:8080/secrets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`
      },
      signal: abortController.signal
    })
      .then(response => response.json())
      .then(data => {
        setShows(data.data);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Wrapper>
      <Text>Welcome to the secret page.</Text>
      {accessToken && <Button onClick={handleLogout} title="Log out" />}
    </Wrapper>
  );
};
