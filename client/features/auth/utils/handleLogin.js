import axios from "axios";
export const handleLogin = async ({ username, password }) => {
  const auth = await axios
    .post(`/users/login`, { username, password })
    .then((res) => res.data);
  return auth;
};
