import axios from "axios";
import { vercelPrefix } from "../../../utils/api/vercel";
export const handleSignup = async ({ email, username, password, region }) => {
  console.log(email, username, password);
  const authResult = await axios
    .post(`${vercelPrefix}/api/user/signup`, {
      email,
      username,
      password,
      region,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return authResult;
};
