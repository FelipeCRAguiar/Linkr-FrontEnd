import { DebounceInput } from "react-debounce-input";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

export default function SerachBar() {
  const { token } = useContext(AuthContext)
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [userList, setUserList] = useState([])

  useEffect(() => {
    if(username) {
      const promise = axios.get(`https://back-project-linkr.herokuapp.com/username?name=${username}`, config)
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

  function handleClick(id) {
    navigate(`/user/${id}`)
    setUsername("")
    setUserList([])
  }

  return(
    <Container>
      <InputBox>
        <DebounceInput minLength={3} debounceTimeout={300} onChange={e => setUsername(e.target.value)} value={username} placeholder='Search for people' className="searchInput"/>
        <IoIosSearch className="searchIcon"/>
      </InputBox>
      <UserListContainer>
        {userList.map(el => {
          <UserListItem onClick={() => handleClick(el.id)} key={el.id}>
            <img src={el.image} alt='user picture'/>
            <h1>{el.username}</h1>
          </UserListItem>
        })}
      </UserListContainer>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  z-index: 15;
  display: flex;
  top: 14px;
  align-items: center;
  justify-content: center;
  width: 39%;
`

const InputBox = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 16;
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 0px 14px;

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
  }

  .searchIcon {
    font-size: 25px;
    color: #C6C6C6;
  }
`

const UserListContainer = styled.ul`
  width: 100%;
  background-color: #e7e7e7;
  border-radius: 8px;
  position: absolute;
  top: 0px;
  z-index: 15;
  padding: 45px 17px 0px 17px;
`

const UserListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 7px 0px;

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