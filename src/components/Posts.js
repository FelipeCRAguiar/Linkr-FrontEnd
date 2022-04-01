import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import DeletePost from "./DeletePost.js";
import EditPost from "./EditPost.js";
import { likePost } from "../functions/likePost.js";
import axios from "axios";
import AuthContext from "../contexts/AuthContext.js";

export default function Posts(props) {
  const commentsArray = [];
  props.posts.forEach(() => commentsArray.push(""));
  const clearCommentsArray = commentsArray;

  const navigate = useNavigate();
  const [comment, setComment] = useState(commentsArray);
  const [commentsToShow, setCommentsToShow] = useState([]);
  const { userId } = useContext(AuthContext);
   

    function handleChange(e, index) {
      commentsArray[index] = e.target.value
      setComment(commentsArray);
    }
    
    function insertComment(postId, userId, index, setRender, render) {

      const promise = axios.post(
        `https://back-project-linkr.herokuapp.com/comment/${postId}/${userId}`, {comment: comment[index]}
      );

      promise.then(() => {
        setComment(clearCommentsArray);
        setRender(!render)
      });
      promise.catch((error) => {
        console.log(error);       
      });
    }

   function showComments(postId) {
      if(commentsToShow.find(id => id === postId)) {
      
        const newCommentsToShow = commentsToShow.filter(id => id !== postId)
        setCommentsToShow(newCommentsToShow);

      } else {
        setCommentsToShow([...commentsToShow, postId, ])
      }
    }
    
    return (
        props.posts.map(post => (
          <Container key={post.id}>
            <ContainerPost>
              <ProfilePicContainer>
                <img
                  alt="profile picture"
                  src={post.image}
                  onClick={() => {
                    navigate(`/user/${post.userId}`);
                  }}
                />
                {post.likes.find((like) => like.userId.toString() === props.userId) ? (
                  <button disabled={isDisabled} onClick={() => likePost(post.id, post.likes, props.userId, props.setRender, props.render, setIsDisabled)}>
                    <FaHeart 
                      color={"#ef2929"}
                      height="20px"
                      width="20px"
                    />
                  </button>
                ) : (
                  <button disabled={isDisabled} onClick={() => likePost(post.id, post.likes, props.userId, props.setRender, props.render, setIsDisabled)}>
                    <FaRegHeart
                      color={"#FFFFFF"}
                      height="20px"
                      width="20px"
                    />
                  </button>
                )}
                <p>{post.likes.length} likes</p>
                {/* <NamesBox className="div-names">
                    <div className="triangle"></div>
                    <div className="names-box">
                        <p className="p-box-names">
                           {post.likes.find(like => like.userId.toString() === props.userId) ? 'Você,' : ''} {post.likes[0].userId.toString() === props.userId ? post.likes[1].username : post.likes[0].username} e mais {post.likes.length - 2} 
                        </p>
                    </div>
                </NamesBox> */}
                <IoChatbubblesOutline
                  onClick={() => showComments(post.id)}
                  color={"#FFFFFF"}
                  height="20px"
                  width="20px"
                  />
                  <p>{post.comments && post.comments.length} comments</p>
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
                  <div className="img-div">
                    <img alt="link image" src={post.linkImage} />
                  </div>
                </LinkDiv>
              </Content>
            </ContainerPost>
            {commentsToShow.find(id => id === post.id) 
            &&
            <ContainerComments>
            {post.comments && post.comments.filter(comments => comments.postId === post.id).map(comments => (           
                    <CommentContainer>
                      <ProfilePic>
                        <img src={comments.image}/>
                      </ProfilePic>
                      <CommentBody>
                        <CommentName>
                          <h1>{comments.username}</h1>
                          {post.userId === comments.userId && <h2>• post’s author</h2>}
                        </CommentName>
                        <p>{comments.comment}</p>
                      </CommentBody>
                    </CommentContainer> 
            )) }
                    <CommentInputContainer>
                      <ProfilePic>
                        <img src={post.image}/>
                      </ProfilePic>
                      <InputDiv>
                        <Input
                          className="input"
                          type="text"
                          placeholder="write a comment..."
                          name="comment"
                          value={comment[props.posts.indexOf(post)]}
                          onChange={(e) => handleChange(e, props.posts.indexOf(post))}
                        />
                        <IoIosSend
                          cssClasses="send"
                          onClick={() => insertComment(post.id, props.userId, props.posts.indexOf(post), props.setRender, props.render)}
                          color={"#FFFFFF"}
                          height="15px"
                          width="15px"
                        />
                      </InputDiv>
                    </CommentInputContainer> 
            </ContainerComments>
            }
          </Container>  
            
          ))
    );

          }

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  gap: 30px;
  margin-bottom: 50px;

  @media (max-width: 620px) {
    width: 100%;
  }

`;

const Input = styled.input`
  width: 90%;

  border: none;
  background-color: transparent;

  color: white;
`;

const InputDiv = styled.div`
  height: 39px;
  width: 90%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 10px;

  margin-left: 5px;

  border-radius: 8px;

  background-color: #252525;

  .send {
    transform: rotate(-45deg);
  }
`;

const CommentInputContainer = styled.div`
  width: 90%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 20px;

  img {
    height: 39px;
    width: 39px;

    border-radius: 100px;
  }
`;

const ContainerComments = styled.div`
  width: 620px;

  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;


  padding-top: 47px;
  margin-top: -70px;
  padding-bottom: 30px;

  background-color: #1e1e1e;

@media (max-width: 620px) {
    width: 100%;
  }
`;

const CommentContainer = styled.div`
  display: flex;

  padding: 12px 0;

  width: 90%;

  border-bottom: solid 1px #353535;

  h1 {
    font-family: "Lato";
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #f3f3f3;

    margin-bottom: 5px;
  }

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #acacac;
  }
`;

const ProfilePic = styled.div`
  img {
    height: 39px;
    width: 39px;

    border-radius: 100px;
  }

  width: 10%;

  display: flex;
  justify-content: flex-start;
  padding-left: 5px;
  box-sizing: border-box;
`;

const CommentBody = styled.div`
  width: 90%;
`;

const CommentName = styled.div`
  display: flex;

  h2 {
    font-family: "Lato";
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #565656;

    margin-left: 4px;
  }
`;

const ContainerPost = styled.div`
  width: 620px;
  border-radius: 16px;

  background-color: #171717;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  z-index: 5;

  .div-names {
    position: static;
  }

  .div-link:hover {
    cursor: pointer;
  }

  p:hover + .div-names {
    display: flex;
  }

  @media (max-width: 620px) {
    width: 100%;

    border-radius: 0px;
  }
`;

const NamesBox = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  z-index: 10;

  margin-top: 3px;

  .triangle {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    border-bottom: 5px solid white;
  }

  .names-box {
    height: 24px;
    width: 169px;

    background-color: white;

    border-radius: 3px;

    display: flex;
    justify-content: center;
    align-items: center;

    .p-box-names {
      font-family: "Lato";
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;
      color: #505050;
    }
  }
`;

const ProfilePicContainer = styled.div`
  width: 15%;

  padding: 0px, 10px;

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
    margin-bottom: 15px;
  }

  button{
    

    background-color: transparent;
    border: none;
  }

  .like-post:hover {
    cursor: pointer;
  }

  @media (max-width: 400px) {
    width: 20%;
  }
`;

const Content = styled.div`
  height: 100%;
  width: 85%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  gap: 7px;
  padding: 18px 0;
  padding-right: 20px;

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

  span {
    font-weight: 700;
    color: #000000;
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

  width: 100%;

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

  .img-div{
    height: 100%;
  }
`;

const StyledHashtag = styled.span`
  font-weight: 700;
  color: #ffffff;
`
