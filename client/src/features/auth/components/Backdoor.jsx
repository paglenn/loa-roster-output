import React from "react";
import axios from "axios";
import { vercelPrefix } from "../../../utils/api/vercel";
export const BackDoorButton = ({ setUser, navigate }) => (
  <button
    className="bg-red-600 rounded"
    role="backdoor"
    type="button"
    onClick={async () => {
      // validate route
      const secret = localStorage.getItem("secret");
      const auth = await axios
        .post(`${vercelPrefix}/api/user/admin`, { secret })
        .then((res) => res.data);
      console.log("auth status: ", auth);
      if (auth.isAdmin) {
        setUser("test");
        navigate("/app");
      }
    }}
  >
    Take me to the app!
  </button>
);
