import { DebounceInput } from "react-debounce-input";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function SearchBar() {
  const { token, userId } = useContext(AuthContext)
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [userList, setUserList] = useState([])

  useEffect(() => {
    if (username) {
      const promise = axios.get(`https://back-project-linkr.herokuapp.com/username/${userId}?name=${username}`, config)
      promise.then((response) => {
        setUserList(response.data)
      })
      promise.catch((error) => {
        console.log(error)
      })
    }
    else {
      setUserList([])
    }
  }, [username])
  console.log(userList);
  function handleClick(id) {
    navigate(`/user/${id}`)
    setUsername("")
    setUserList([])
  }

  return (
    <Container>
      <InputBox>
        <DebounceInput minLength={3} debounceTimeout={300} onChange={e => setUsername(e.target.value)} value={username} placeholder='Search for people' className="searchInput" />
        <IconContext.Provider value={{ color: "gray", size: "28px" }}>
          <AiOutlineSearch />
        </IconContext.Provider>
      </InputBox>
      <UserListContainer>
        {userList.map((el) => (
          <UserListItem onClick={() => handleClick(el.id)} key={el.id}>
            <img src={el.image} alt='user picture' />
            {el.followed? <h1>{el.username} <Following>• following</Following></h1> : <h1>{el.username}</h1>}
          </UserListItem>
        ))}
      </UserListContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  z-index: 15;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`

const InputBox = styled.div`
  width: 563px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 16;
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 0px 14px;
  box-sizing: border-box;
  overflow: hidden;

  .searchInput {
    width: 100%;
    height: 45px;
    border: none;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #C6C6C6;
    outline: none;
  }

  .searchIcon {
    font-size: 25px;
    color: #C6C6C6;
  }
`

const UserListContainer = styled.div`
  width: 100%;
  background-color: #E7E7E7;
  border-radius: 8px;
  padding-top: 40px;
  box-sizing: border-box;
  position: absolute;
  top: 0px;

  z-index: 15;
`

const UserListItem = styled.div`
  height: 40px;
  padding: 17px 17px 17px 17px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 20;

  img {
    width: 39px;
    height: 39px;
    border-radius: 100px;
  }

  h1 {
    padding-left: 12px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
  }
`

const Following = styled.span`
  font-family: 'Lato';
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #C5C5C5;
`
