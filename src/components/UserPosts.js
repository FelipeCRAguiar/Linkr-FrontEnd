import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Posts from "./Posts";

export default function UserPosts(props) {
  const { token, userId } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const [error, setError] = useState(false);

  useEffect(() => {
    const promise = axios.get(`http://localhost:4000/user/${props.id}`, config);

    promise.then((response) => {
      setPosts(response.data);
    });
    promise.catch(() => {
      console.log(error)
      setError(true)
    }) 
  }, [error, token, userId, posts]);

  while (posts === null) {
    return (
      <Loading>
        <Oval
          ariaLabel="loading-indicator"
          height={50}
          width={50}
          strokeWidth={0}
          strokeWidthSecondary={5}
          color="#1877f2"
          secondaryColor="white"
        />
      </Loading>
    );
  }

  if (posts.length === 0) {
    return (
      <Loading>
        <h1>There are no posts made by this user yet</h1>
      </Loading>
    );
  } else if (error) {
    return (
      <Loading>
        <h1>
          An error occured while trying to fetch the posts, please refresh the
          page
        </h1>
      </Loading>
    );
  } else {
    return <Posts posts={posts} userId={userId}/>;
  }
}



const Loading = styled.div`
  width: 620px;
  height: 376px;
  border-radius: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }
`;