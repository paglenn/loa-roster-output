import { vercelPrefix } from "./vercel";
import axios from "axios";
export const checkAdmin = () => {
  const secret = localStorage.getItem("secret");
  if (!secret) return Promise.resolve(false);
  else
    return axios
      .post(`${vercelPrefix}/api/user/admin`, { secret })
      .then((res) => res.data.isAdmin);
};
