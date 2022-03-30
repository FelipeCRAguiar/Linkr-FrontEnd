import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/reset.css";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Header from "./views/Header";
import Timeline from "./views/Timeline";
import AuthContext from "./contexts/AuthContext";
import { useState } from "react";
import UserPage from "./views/UserPage";
import Hashtags from "./views/Hashtags";

export default function App() {

  const persistedtoken = localStorage.getItem("token");
  const persistedAvatar = localStorage.getItem("avatar");
  const persistedId = localStorage.getItem("userId");

  const [token, setToken] = useState(persistedtoken);
  const [avatar, setAvatar] = useState(persistedAvatar);
  const [userId, setUserId] = useState(persistedId);
  const [trigger, setTrigger] = useState(false);
  
  function setAndPersistToken(token, avatar, userId) {
    setToken(token);
    localStorage.setItem("token", token);
    setAvatar(avatar);
    localStorage.setItem("avatar", avatar);
    setUserId(userId);
    localStorage.setItem("userId", userId);
  }

  return (

    <AuthContext.Provider
      value={{
        token,
        setToken,
        setAndPersistToken,
        avatar,
        setAvatar,
        userId,
        setUserId,
        trigger,
        setTrigger,
      }}
    >

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={[<Header />, <Timeline />]} />
          <Route path="/user/:id" element={[<Header />, <UserPage />]} />
          <Route path="/hashtag" element={<Hashtags/>} />
        </Routes>
      </BrowserRouter>
    // </AuthContext.Provider>
  );
}
