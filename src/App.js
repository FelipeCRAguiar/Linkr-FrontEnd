import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/reset.css";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Header from "./views/Header";
import Timeline from "./views/Timeline";
import AuthContext from "./contexts/AuthContext";
import { useState } from "react";

export default function App() {
  const [token, setToken] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userId, setUserId] = useState("");

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
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={[<Header />, <Timeline />]} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
