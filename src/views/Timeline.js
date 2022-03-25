import React from "react";
import CreatePost from "../components/CreatePost.js";
import styled from "styled-components";
import Posts from "../components/Posts.js";

export default function Timeline() {
  return (
    <Container>
      <Content>
        <PageTitle>timeline</PageTitle>
        <NewPost>
          <CreatePost />
        </NewPost>
        <Posts />
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
