import React from "react";
export const BackDoorButton = ({ setUser, navigate }) => (
  <button
    className="bg-red-600 rounded"
    role="backdoor"
    onClick={() => {
      setUser("test");
      navigate("/app");
    }}
  >
    {" "}
    Take me to the app!{" "}
  </button>
);
