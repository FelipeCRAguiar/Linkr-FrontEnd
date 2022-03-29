import axios from "axios";

export function likePost(postId, likes, userId) {
    const isLiked = likes.find((like) => like.userId.toString() === userId);

    if (isLiked) {
      const promise = axios.delete(`
        https://back-project-linkr.herokuapp.com/unlike/${postId}/${userId}`
      );

      promise.then((response) => {});
      promise.catch((error) => {
        console.log(error);
      });
    } else {
      const promise = axios.post(`
        https://back-project-linkr.herokuapp.com/like/${postId}/${userId}`
      );
      
      promise.then((response) => {});
      promise.catch((error) => {
        console.log(error);
      });
    }
  }