import React from "react";
import { checkAdmin } from "../../../utils/api";
export const BackDoorButton = ({ setUser, navigate }) => {
  const submitHandler = async () => {
    const auth = checkAdmin();
    if (auth) {
      setUser("test");
      navigate("/app");
    }
  };

  return (
    <button
      className="bg-red-600 rounded"
      role="backdoor"
      type="button"
      onClick={submitHandler}
    >
      Take me to the app!
    </button>
  );
};
