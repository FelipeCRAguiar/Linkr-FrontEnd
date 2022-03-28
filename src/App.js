import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/reset.css";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Header from "./views/Header";
import Timeline from "./views/Timeline";
import { AuthContext } from "./contexts/Auth";
import { useState } from "react";

export default function App() {
  const tokenOnLocalStorage = localStorage.getItem("token");
  const [token, setToken] = useState("");
  const [trigger, setTrigger] = useState(false);

  function setAndPersistToken(token) {
    setToken(token);
    localStorage.setItem("token", token);
  }

  return (
    <AuthContext.Provider value={{ token, setToken, setAndPersistToken, trigger, setTrigger  }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={[<Header />, <Timeline />]} />
        </Routes>
      </BrowserRouter>
    // </AuthContext.Provider>
  );
}
