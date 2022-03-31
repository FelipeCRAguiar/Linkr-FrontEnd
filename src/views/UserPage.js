import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Trends from "../components/Trends.js";
import UserPosts from "../components/UserPosts.js";
import AuthContext from "../contexts/AuthContext.js";

export default function UserPage() {
  const { id } = useParams()
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState({})

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const promise = axios.get(`https://back-project-linkr.herokuapp.com/users/${id}`, config)

    promise.then((response) => {
      console.log(response.data)
      setUser(response.data)
    })
    promise.catch((error) => {
      console.log(error)
    })
    console.log(user)
  }, [])
  
  return (
    <Container>
      <Content>
        <PageTitle>
          <UserContainer>
            <UserImage src={user.image}/>
            <span>{user.username}'s posts</span>
          </UserContainer>
          <FollowButton>Follow</FollowButton>
        </PageTitle>
        <UserPosts id={id}/>
      </Content>
      <Trends />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background: #333333;
  margin-top: 70px;
  display: flex;
  gap: 15px;
  min-height: calc(100vh - 70px);
  justify-content: center; 
  position: absolute;
`;

const PageTitle = styled.h2`
  width: 936px;
  font-size: 32px;
  font-family: "Oswald", normal;
  color: white;
  margin-bottom: 43px;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  width: 620px;
  margin-top: 78px;
  @media (max-width: 413) {
    width: 100%;
  }
`;

const UserImage = styled.img`
  height: 50px;
  width: 50px;

  border-radius: 100px;
`;

const FollowButton = styled.button`
  width: 112px;
  height: 31px;
  background-color: #1877F2;
  border-radius: 5px;
  border: none;

  font-family: 'Lato';
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #FFFFFF;
`

const UnfollowButton = styled.button`
  width: 112px;
  height: 31px;
  background-color: #FFFFFF;
  border-radius: 5px;
  border: none;

  font-family: 'Lato';
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #1877F2;
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 18px;
  }
`