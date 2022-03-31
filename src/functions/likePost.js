import axios from "axios";

export function likePost(postId, likes, userId) {
    const isLiked = likes.find((like) => like.userId.toString() === userId);

    if (isLiked) {
      const promise = axios.delete(`
        http://localhost:4000/unlike/${postId}/${userId}`
      );

      promise.then((response) => {});
      promise.catch((error) => {
        console.log(error);
      });
    } else {
      const promise = axios.post(`
        http://localhost:4000/like/${postId}/${userId}`
      );
      
      promise.then((response) => {});
      promise.catch((error) => {
        console.log(error);
      });
    }
  }