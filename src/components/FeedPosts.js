import { useState, useEffect, useContext } from "react";
import { getPosts } from "../services";
import { Oval } from "react-loader-spinner";
import Posts from "./Posts";
import styled from "styled-components";
import useInterval from "use-interval";
import AuthContext from "../contexts/AuthContext.js";

export default function FeedPosts() {
  const [posts, setPosts] = useState(null);
  const [newPosts, setNewPosts] = useState({});
  const [followeds, setFolloweds] = useState(true);
  const [error, setError] = useState(false);
  const { setNewPostsAlert } = useContext(AuthContext);

  useEffect(() => {
    getPosts()
      .then((response) => {
        if (response.status === 204) {
          setFolloweds(false);
        }
        setPosts(response.data);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  useInterval(() => {
    getPosts()
      .then((response) => {
        setNewPosts(response.data);
      })
      .catch(() => {
        setError(true);
      });

    if (newPosts.length > posts.length) {
      setNewPostsAlert(newPosts.length - posts.length);
    }
  }, 15000);

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

  if (followeds === false) {
    return (
      <Loading>
        <h1>You don't follow anyone yet. Search for new friends!</h1>
      </Loading>
    );
  } else if (posts.length === 0) {
    return (
      <Loading>
        <h1>No posts found from your friends</h1>
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
    return <Posts posts={posts} />;
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
