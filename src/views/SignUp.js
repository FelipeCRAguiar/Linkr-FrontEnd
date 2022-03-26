import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Form, Input, LinkrMotto, StyledLink } from "../components";
import { signUp } from "../services/signup";

export default function SignUp() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    image: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {

    e.preventDefault();
    setIsDisabled(true);
    console.log();
    try {
      await signUp({ ...formData });
      navigate("/");
    } catch (error) {
      console.log(error.status);
      if (error.status === 422) {
        alert("All fields are required");
      }

      if (error.status === 409) {
        alert("This username already exists");
      }

      if (error.status === 500) {
        alert("Sorry, an internal error has occurred");
      }
    }
  }

  return (
    <Container>
      <LinkrMotto>
        <Linkr>linkr</Linkr>
        <Motto>
          <span>save, share and discover the best links on the web</span>
        </Motto>
      </LinkrMotto>
      <ContainerLogin>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Input
            type="text"
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Input
            type="url"
            placeholder="picture url"
            name="image"
            value={formData.picture}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Button type="submit" disabled={isDisabled}>
            Sign Up
          </Button>
        </Form>
        <StyledLink to="/">Switch back to log in</StyledLink>
      </ContainerLogin>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Linkr = styled.p`
  font-family: "Passion One";
  font-weight: 700;
  font-size: 106px;
  line-height: 117px;
  letter-spacing: 0.05em;
  color: #ffffff;
`;

const Motto = styled.div`
  width: 442px;
  height: 128px;

  font-family: "Oswald";
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
`;

const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 1024px;
  margin-right: 55px;
`;
