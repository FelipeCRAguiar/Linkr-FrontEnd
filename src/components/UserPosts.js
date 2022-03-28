import styled from "styled-components";
import { HeartOutline } from "react-ionicons";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import DeletePost from "../components/DeletePost.js";
import { useNavigate } from "react-router-dom";

export default function UserPosts(props) {
  const { token, userId } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const promise = axios.get(`https://back-project-linkr.herokuapp.com/user/${props.id}`, config);

    promise.then((response) => {
      setPosts(response.data);
    });
    promise.catch(() => {
      console.log(error)
      setError(true)
    }) 
  }, [error, token, userId, posts]);

  function likePost(postId, likes) {
    const isLiked = likes.find((like) => like.userId.toString() === userId);

    if (isLiked) {
      const promise = axios.delete(
        `https://back-project-linkr.herokuapp.com/unlike/${postId}/${userId}`
      );

      promise.then((response) => {});
      promise.catch(() => {
        console.log(error);
      });
    } else {
      const promise = axios.post(`
      https://back-project-linkr.herokuapp.com/like/${postId}/${userId}`
      );
      
      promise.then((response) => {});
      promise.catch(() => {
        console.log(error);
      });
    }
  }

  while (posts === null) {
    return (
      <Loading>
        <Oval
          ariaLabel="loading-indicator"
          height={50}
          width={50}
          strokeWidth={0}
          strokeWidthSecondary={5}
          color="#1877f2"
          secondaryColor="white"
        />
      </Loading>
    );
  }

  if (posts.length === 0) {
    return (
      <Loading>
        <h1>There are no posts made by this user yet</h1>
      </Loading>
    );
  } else if (error) {
    return (
      <Loading>
        <h1>
          An error occured while trying to fetch the posts, please refresh the
          page
        </h1>
      </Loading>
    );
  } else {
    return posts.map((post) => (
      <Container key={post.id}>
        <ProfilePicContainer>
          <img
            alt="profile picture"
            src={post.image}
            onClick={() => {
              navigate(`/user/${post.userId}`);
            }}
          />
          {post.likes.find((like) => like.userId.toString() === userId) ? (
            <Heart
              onClick={() => likePost(post.id, post.likes)}
              color={"#ef2929"}
              height="20px"
              width="20px"
            />
          ) : (
            <HeartOutline
            onClick={() => likePost(post.id, post.likes)}
            color={"#FFFFFF"}
            height="20px"
            width="20px"
            />
          )}
          <p>{post.likes.length} likes</p>
        </ProfilePicContainer>
        <Content>
          <h1
            onClick={() => {
              navigate(`/user/${post.userId}`);
            }}
          >
            {post.username}
          </h1>
          {post.userId === userId ? (
            <>
              <DeletePost post={post} />
              <EditPost post={post} />
            </>
          ) : null}
          <p>{post.text}</p>
          <LinkDiv className="div-link" onClick={() => window.open(post.link)}>
            <TextsLink>
              <h2>{post.title}</h2>
              <h3>{post.description}</h3>
              <h4>{post.link}</h4>
            </TextsLink>
            <div>
              <img alt="link image" src={post.linkImage} />
            </div>
          </LinkDiv>
        </Content>
      </Container>
    ));
  }
}

const Container = styled.div`
  width: 620px;
  border-radius: 16px;

  background-color: #171717;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  margin: 30px 0;

  .div-link:hover {
    cursor: pointer;
  }
`;

const ProfilePicContainer = styled.div`
  width: 86px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  img {
    height: 50px;
    width: 50px;

    margin-top: 18px;
    margin-bottom: 20px;

    border-radius: 100px;
  }

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #ffffff;

    margin-top: 3px;
  }

  .like-post:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  gap: 7px;
  padding: 18px 0;

  h1 {
    font-family: "Lato";
    font-weight: 400;
    font-size: 19px;
    line-height: 18px;
    color: #ffffff;
  }

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 17px;
    line-height: 18px;
    color: #b7b7b7;

    margin-bottom: 10px;
  }
`;

const TextsLink = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 7px;
  padding: 18px 19px;

  h2 {
    font-family: "Lato";
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  }

  h3 {
    font-family: "Lato";
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
  }

  h4 {
    font-family: "Lato";
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #cecece;

    margin-top: 12px;
  }
`;

const LinkDiv = styled.div`
  box-sizing: border-box;

  width: 503px;
  height: 155px;

  border: solid 1px #4d4d4d;
  border-radius: 12px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    height: 155px;
    width: 155px;

    border-radius: 0 12px 12px 0;

    margin-top: 2px;
  }
`;

const Loading = styled.div`
  width: 620px;
  height: 376px;
  border-radius: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }
`;