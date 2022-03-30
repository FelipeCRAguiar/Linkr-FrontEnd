import styled from "styled-components";
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import DeletePost from "./DeletePost.js";
import EditPost from "./EditPost.js";
import { likePost } from "../functions/likePost.js";

export default function Posts(props) {

  const navigate = useNavigate()

  return (
    props.posts.map((post) => (
      <Container key={post.id}>
        <ProfilePicContainer>
          <img
            alt="profile picture"
            src={post.image}
            onClick={() => {
              navigate(`/user/${post.userId}`);
            }}
          />
          {post.likes.find((like) => like.userId.toString() === props.userId) ? (
            <FaHeart
              onClick={() => likePost(post.id, post.likes, props.userId)}
              color={"#ef2929"}
              height="20px"
              width="20px"
            />
          ) : (
            <FaRegHeart
              onClick={() => likePost(post.id, post.likes, props.userId)}
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
          {post.userId === props.userId ? (
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
    ))
  );
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

