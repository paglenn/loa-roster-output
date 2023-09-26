import axios from "axios";
export const handleLogin = async ({ email, password }) => {
  const auth = await axios
    .post("/api/user/login", { email, password })
    .then((res) => {
      console.log("server response", res);
      return res.data;
    })
    .catch((err) => console.log(err));
  console.log(auth);
  return auth;
};
