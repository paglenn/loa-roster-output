import axios from "axios";
export const handleLogin = async ({ email, password }) => {
  const auth = await axios
    .post("/user/login", { email, password })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return auth;
};
