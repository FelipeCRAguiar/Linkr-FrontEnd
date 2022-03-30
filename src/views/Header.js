import styled from "styled-components";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import ArrowButton from "../components/ArrowButton";
import SearchBar from "../components/SearchBar";
  
export default function Header() {
  const { avatar } = useContext(AuthContext);

  return (
    <Top>
      <Logo>
        <StyledLink to="/timeline">
          <Linkr>linkr</Linkr>
        </StyledLink>
      </Logo>
      <SearchBar />
      <UserBox>
        <ArrowButton>
        </ArrowButton>
        <UserAvatar src={avatar} />
      </UserBox>
    </Top>
  );
}

const Linkr = styled.p`
  font-family: "Passion One";
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;
  letter-spacing: 0.05em;
  color: #ffffff;

  @media (max-width: 375px) {
    font-size: 76px;
  }
`;

const Top = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 70px;
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  @media (max-width: 413) {
    width: 100%;
    position: fixed;
    top: 0px;
  }
`;

const Logo = styled.div`
  width: 108px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffffff;
  background-color: #151515;
  letter-spacing: 4px;
  padding-left: 28px;
`;

const UserBox = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  width: 90px;
  height: auto;
  border: none;
  transition: box-shadow 0.4s ease;
  background-color: #151515;
  cursor: pointer;
  padding: 0 17px 0 0;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
const Menu = styled.div`
  
`;