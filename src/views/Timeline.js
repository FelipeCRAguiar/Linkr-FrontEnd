import React from "react";
import CreatePost from "../components/CreatePost.js";
import styled from "styled-components";
import Posts from "../components/Posts.js";
import { useNavigate } from "react-router-dom";
import FeedPosts from "../components/FeedPosts.js";
import AuthContext from "../contexts/AuthContext.js";
import Trends from "../components/Trends.js";


export default function Timeline() {
  const { trigger, setTrigger } = React.useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <Container onClick={() => setTrigger(false)}>
      <Content>
        {trigger &&  <LogoutButton onClick={() => navigate("/") }>Logout</LogoutButton>}
        <PageTitle>timeline</PageTitle>
        <NewPost>
          <CreatePost />
        </NewPost>
        <FeedPosts/>
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
const NewPost = styled.div`
  width: 100%;
  height: 210px;
  background-color: #ffff;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  @media (max-width: 413) {
    width: 100%;
  }
`;
const LogoutButton = styled.div`
  width: 150px;
  height: 47px;
  position: absolute;
  background-color: #171717;
  border-bottom-left-radius: 20px;
  color: #FFFFFF;
  font-family: 'Lato';
  font-size: 17px;
  
  
  display: ${props => props.triggered ? "none" : "inherit"};
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
