import axios from "axios";
const baseUrl = "/api/login";

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password });
  const userdata = response.data;
  return userdata;
};
export default login;
