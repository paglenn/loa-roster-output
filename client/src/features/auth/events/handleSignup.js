import axios from "axios";
import { vercelPrefix } from "../../../utils/api/vercel";
export const handleSignup = async ({ email, username, password }) => {
  console.log(email, username, password);
  const auth = await axios
    .post(`${vercelPrefix}/api/user/signup`, { email, username, password })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  console.log("response data: ", auth);
  return auth;
};
