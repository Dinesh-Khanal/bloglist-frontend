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
const blogService = { getAll, create };
export default blogService;
