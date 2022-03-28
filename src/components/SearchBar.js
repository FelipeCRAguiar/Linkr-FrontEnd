import { DebounceInput } from "react-debounce-input";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SerachBar() {
  const { token } = useContext(AuthContext)
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [userList, setUserList] = useState([])

  useEffect(() => {
    if(username) {
      const promise = axios.get(`http://localhost:4000/username?name=${username}`, config)
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

  return(
    <></>
  )
}