import React, { useRef, useState, useEffect, useContext } from "react";
import { TiPencil } from "react-icons/ti";
import styled from "styled-components";
import axios from "axios";
import AuthContext from "../contexts/AuthContext.js";

export default function EditPost({ post }) {
  const [isEditing, setEditing] = useState(false);
  const [sendingEdit, setSendingEdit] = useState(false);
  const [postText, setPostText] = useState("");
  const inputRef = useRef();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function publishEditedPost() {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    setSendingEdit(true);

    const promise = axios.patch(
      `http://localhost:4000/posts/${post.id}`,
      { text: postText },
      config
    );
    promise
      .then(() => {
        setEditing(false);
        setSendingEdit(false);
      })
      .catch(() => {
        setSendingEdit(false);
        alert("Não foi possível salvar as alterações ");
      });
  }

  function handleKeysPressed(event) {
    if (event.key === "Enter") {
      publishEditedPost();
    }

    if (event.key === "Escape") {
      setEditing(false);
    }
  }

  return (
    <>
      <EditPostIcon
        onClick={() => {
          setEditing(!isEditing);
          setPostText(post.text);
        }}
      >
        <TiPencil color="white" size="1.2em" />
      </EditPostIcon>
      {isEditing ? (
        <form>
          <PostTextInput
            type="text"
            ref={inputRef}
            name="postText"
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
            wrap="soft"
            disabled={sendingEdit}
            onKeyDown={handleKeysPressed}
          />
        </form>
      ) : null}
    </>
  );
}

const EditPostIcon = styled.div`
  position: absolute;
  top: 22px;
  right: 15px;
  cursor: pointer;
  margin-right: 8px;
`;

const PostTextInput = styled.textarea`
  margin: 10px 0 5px 0;
  height: 66px;
  resize: none;
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
`;
