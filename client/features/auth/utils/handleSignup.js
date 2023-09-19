import axios from "axios";
export const handleSignup = async ({ email, username, password }) => {
  const auth = await axios
    .post("/user/signup", { email, username, password })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  console.log("auth object: ", auth);
  return auth;
};
