import axios from "axios";

export function likePost(postId, likes, userId, setRender, render, setIsDisabled) {
    const isLiked = likes.find((like) => like.userId.toString() === userId);
    setIsDisabled(true);

    if (isLiked) {
      const promise = axios.delete(`
      http://localhost:4000/unlike/${postId}/${userId}`
      );

      promise.then((response) => {
        setRender(!render)
      });
      promise.catch((error) => {
        console.log(error);
      });
    } else {
      const promise = axios.post(`
      http://localhost:4000/like/${postId}/${userId}`
      );
      
      promise.then((response) => {
        setRender(!render)
      });
      promise.catch((error) => {
        console.log(error);
      });
    }
  }