import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Trends from "../components/Trends.js";
import UserPosts from "../components/UserPosts.js";
import AuthContext from "../contexts/AuthContext.js";
import { getUser } from "../services/index.js";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const { id } = useParams();
  const { token, userId, newPostsAlert } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [following, setFollowing] = useState(false);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const body = { followerId: userId, followedId: id };
  const navigate = useNavigate();

  useEffect(() => {
    getUser(id)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const promise2 = axios.get(
      `https://back-project-linkr.herokuapp.com/isfollowing/${userId}/${id}`,
      config
    );

    promise2.then((response) => {
      console.log(response.data);
      setFollowing(response.data);
    });
    promise2.catch((error) => {
      console.log(error);
    });
  }, []);

  function FollowUnfollow() {
    setIsDisabled(true);

    if (following) {
      const promise = axios.delete(
        "https://back-project-linkr.herokuapp.com/unfollow",
        body,
        config
      );

      promise.then((response) => {
        setFollowing(false);
      });
      promise.catch((error) => {
        console.log(error);
        alert("Sua requisição encontrou um problema, favor tentar novamente");
      });
    } else if (!following) {
      const promise = axios.delete(
        "https://back-project-linkr.herokuapp.com/follow",
        body,
        config
      );

      promise.then((response) => {
        setFollowing(true);
      });
      promise.catch((error) => {
        console.log(error);
        alert("Sua requisição encontrou um problema, favor tentar novamente");
      });
    }

    setIsDisabled(false);
  }

  return (
    <Container>
      <Content>
        <PageTitle>
          <UserContainer>
            <UserImage src={user.image} />
            <span>{user.username}'s posts</span>
          </UserContainer>
          {following ? (
            <FollowButton onClick={FollowUnfollow} disabled={isDisabled}>
              Follow
            </FollowButton>
          ) : (
            <UnfollowButton onClick={FollowUnfollow} disabled={isDisabled}>
              Unfollow
            </UnfollowButton>
          )}
        </PageTitle>
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
        <UserPosts id={id} />
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
  background-color: #1877f2;
  border-radius: 5px;
  border: none;

  font-family: "Lato";
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;

const UnfollowButton = styled.button`
  width: 112px;
  height: 31px;
  background-color: #ffffff;
  border-radius: 5px;
  border: none;

  font-family: "Lato";
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #1877f2;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 18px;
  }
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
