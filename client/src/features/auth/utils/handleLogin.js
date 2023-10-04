import axios from "axios";
import { vercelPrefix } from "../../../utils/vercel";
export const handleLogin = async ({ email, password }) => {
  const auth = await axios
    .post(`${vercelPrefix}/api/user/login`, { email, password })
    .then((res) => {
      console.log("server response", res);
      return res.data;
    })
    .catch((err) => console.log(err));
  console.log(auth);
  return auth;
};
