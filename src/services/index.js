import axios from "axios";

const BASE_URL = "https://back-project-linkr.herokuapp.com";

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

function getPosts() {
  return axios.get(`${BASE_URL}/posts`, config);
}

function getUser(id) {
  return axios.get(`${BASE_URL}/users/${id}`, config);
}

function getUserPosts(id) {
  return axios.get(`${BASE_URL}/user/${id}`, config);
}

export { getPosts, getUser, getUserPosts };
