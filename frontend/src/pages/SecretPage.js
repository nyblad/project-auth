import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
const ItemsWrapper = styled.section`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const Item = styled.div`
  width: 23%;
  border: 2px solid #fff;
  border-radius: 5px;
  margin: 5px;
  padding: 20px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  @media (max-width: 800px) {
    width: 30%;
  }
  @media (max-width: 650px) {
    width: 45%;
  }
  @media (max-width: 450px) {
    width: 90%;
  }
`;
const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;
const ItemText = styled.p`
  font-size: 16px;
  color: #fff;
`;

export const SecretPage = () => {
  const history = useHistory();
  const [shows, setShows] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
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
  }, [accessToken]);

  return (
    <Wrapper>
      <Text>- Welcome to the secret page -</Text>
      <Button onClick={handleLogout} title="Log out" />
      <ItemsWrapper>
        {shows.map(show => (
          <Item key={show.show_id}>
            <Text>{show.title}</Text>
            <ItemText>Released: {show.release_year}</ItemText>
            <ItemText>Type: {show.type}</ItemText>
          </Item>
        ))}
      </ItemsWrapper>
    </Wrapper>
  );
};
