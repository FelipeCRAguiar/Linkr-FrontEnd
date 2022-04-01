import React from "react";
import CreatePost from "../components/CreatePost.js";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import FeedPosts from "../components/FeedPosts.js";
import AuthContext from "../contexts/AuthContext.js";
import Trends from "../components/Trends.js";
import { FiRefreshCw } from "react-icons/fi";

export default function Timeline() {
  const { trigger, setTrigger, newPostsAlert } = React.useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container onClick={() => setTrigger(false)}>
      <Content>
        {trigger && (
          <LogoutButton onClick={() => navigate("/")}>Logout</LogoutButton>
        )}
        <PageTitle>timeline</PageTitle>
        <NewPost>
          <CreatePost />
        </NewPost>
        {newPostsAlert > 0 ? (
          <NewPostsAlertBox onClick={() => navigate(0)}>
            <p>{newPostsAlert} new posts, load more!</p>
            <FiRefreshCw
              color="white"
              size="1.2em"
              style={{
                marginLeft: 14,
              }}
            />
          </NewPostsAlertBox>
        ) : null}
        <FeedPosts />
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
  color: #ffffff;
  font-family: "Lato";
  font-size: 17px;

  display: ${(props) => (props.triggered ? "none" : "inherit")};
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewPostsAlertBox = styled.div`
  width: 100%;
  height: 61px;
  left: 241px;
  top: 481px;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;

  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 17px;
`;
