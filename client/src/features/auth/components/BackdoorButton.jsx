import React from "react";
import { checkAdmin } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { login } from "../../../state/userSlice";
export const BackDoorButton = ({ navigate }) => {
  const dispatch = useDispatch();
  const submitHandler = async () => {
    const auth = await checkAdmin();
    if (auth) {
      dispatch(login("test"));
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
