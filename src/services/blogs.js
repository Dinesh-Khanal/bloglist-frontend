import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const create = (newObject, token) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
};
const remove = (id, token) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response);
};
const update = (blog) => {
  const blogObj = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user.id,
  };
  const request = axios.put(`${baseUrl}/${blog.id}`, blogObj);
  return request.then((response) => response.data);
};
const blogService = { getAll, create, remove, update };
export default blogService;
