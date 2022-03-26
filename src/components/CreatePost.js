import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext.js";

export default function CreatePost() {
  const { avatar } = useContext(AuthContext);
  const [postURL, setPostURL] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  function publishPost(event) {
    setIsPublishing(true);
    event.preventDefault();

    if (postURL === "" || postURL === null) {
      alert("Please, place the link you would like to share!");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const promise = axios.post(
      "http://localhost:4000/post",
      {
        text: postDescription,
        link: postURL,
      },
      config
    );
    promise
      .then((res) => {
        setIsPublishing(false);
        navigate(0);
      })
      .catch((err) => {
        setIsPublishing(false);
        alert("There was an error posting your link");
        alert(err.request.response.message);
      });
  }

  return (
    <CreatePostBox>
      <UserAvatar src={avatar} />
      <InfoBox>
        <p>What are you going to share today?</p>
        <form onSubmit={publishPost}>
          <LinkInput
            type="url"
            name="postURL"
            placeholder="http://..."
            onChange={(e) => setPostURL(e.target.value)}
            value={postURL}
            required
            disabled={isPublishing}
          />
          <DescriptionInput
            type="text"
            name="postDescription"
            onChange={(e) => setPostDescription(e.target.value)}
            value={postDescription}
            placeholder="Description"
            wrap="soft"
            disabled={isPublishing}
          />
          <PublishButton type="submit" disabled={isPublishing}>
            {isPublishing ? "Publishing" : "Publish"}
          </PublishButton>
        </form>
      </InfoBox>
    </CreatePostBox>
  );
}

const CreatePostBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 22px 16px 18px;
  justify-content: space-between;
  gap: 18px;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  font-family: Lato;
  font-style: normal;
  p {
    font-weight: 300;
    font-size: 20px;
    line-height: 28px;
    color: #707070;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    input,
    textarea {
      font-family: Lato;
      font-style: normal;
      font-weight: 300;
      font-size: 20px;
      line-height: 28px;
      width: 100%;
      background: #efefef;
      resize: none;
      border-radius: 5px;
      border: none;
      padding-left: 10px;
      font-size: 15px;
      line-height: 18px;
      word-break: break-all;
      :disabled {
        background-color: grey;
      }
      ::placeholder {
        color: #949494;
      }
    }
  }
`;

const LinkInput = styled.input`
  height: 30px;
`;

const DescriptionInput = styled.textarea`
  height: 66px;
`;

const PublishButton = styled.button`
  align-self: flex-end;
  width: 112px;
  height: 31px;
  background: #1877f2;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  text-align: center;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  :disabled {
    background-color: grey;
  }
`;
