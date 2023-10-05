import axios from "axios";
import { vercelPrefix } from "../../../utils/api/vercel";
export const handleLogin = async ({ email, password }) => {
  const auth = await axios
    .post(`${vercelPrefix}/api/user/login`, { email, password })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return auth;
};
