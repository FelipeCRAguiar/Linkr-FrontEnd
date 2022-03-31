import axios from "axios";

export function likePost(postId, likes, userId) {
    const isLiked = likes.find((like) => like.userId.toString() === userId);

    if (isLiked) {
      const promise = axios.delete(`
      http://localhost:400/unlike/${postId}/${userId}`
      );

      promise.then((response) => {

      });
      promise.catch((error) => {
        console.log(error);
      });
    } else {
      const promise = axios.post(`
      http://localhost:400/like/${postId}/${userId}`
      );
      
      promise.then((response) => {});
      promise.catch((error) => {
        console.log(error);
      });
    }
  }