import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import UserPosts from "../components/UserPosts.js";
import AuthContext from "../contexts/AuthContext.js";

export default function UserPage() {
  const { id } = useParams
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null)

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const promise = axios.get(`http://localhost:4000/users/${props.id}`, config)

    promise.then((response) => {
      console.log(response.data)
      setUser(response.data)
    })
    promise.catch((error) => {
      console.log(error)
    })
  }, [])
  
  return (
    <Container>
      <Content>
        <PageTitle>
          <UserImage src={user.image}/>
          <span>{user.username}'s posts</span>
        </PageTitle>
        <UserPosts id={id}/>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background: #333333;
  margin-top: 70px;
  display: flex;
  min-height: calc(100vh - 70px);
  justify-content: center;
`;

const PageTitle = styled.h2`
  font-size: 32px;
  font-family: "Oswald", normal;
  color: white;
  margin-bottom: 43px;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
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