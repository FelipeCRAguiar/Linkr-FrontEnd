import { FaTrash } from "react-icons/fa";
import React, { useState, useContext } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import axios from "axios";
import AuthContext from "../contexts/AuthContext.js";

export default function DeletePost({ post }) {
  const { token } = useContext(AuthContext);
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#333333",
      borderRadius: "10px",
      color: "white",
    },
    overlay: { zIndex: 10 },
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalWrapper>
          <h2>Are you sure you want to delete this post??</h2>
          <Btn
            color="#1877f2"
            backgroundColor="white"
            onClick={() => setIsOpen(false)}
          >
            No, go back
          </Btn>
          <Btn
            color="white"
            backgroundColor="#1877f2"
            onClick={() => deletePost(post, setIsOpen, token)}
          >
            Yes, delete it
          </Btn>
        </ModalWrapper>
      </Modal>
      <FaTrash
        color="white"
        style={{
          position: "absolute",
          top: "23px",
          right: "0",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(true)}
      />
    </>
  );
}

function deletePost(post, setIsOpen, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.delete(
    `https://back-project-linkr.herokuapp.com/posts/${post.id}`,
    config
  );
  promise
    .then(() => {
      setIsOpen(false);
      window.location.reload(false);
    })
    .catch(() => alert("Não foi possível excluir o post, tente novamente!"));
}

const ModalWrapper = styled.div`
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 19px;
  width: 300px;
  text-align: center;
  background-color: #333333;
  margin-top: 20px;
`;

const Btn = styled.button`
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 13px;
  width: 100px;
  height: 25px;
  margin: 15px;
  border: 0px;
  border-radius: 5px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
`;
