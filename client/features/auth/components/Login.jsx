import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
export const Login = ({ submitHandler }) => {
  const userInfo = useRef({});
  const navigate = useNavigate();
  return (
    <div className="rounded-lg bg-slate-700 text-slate-50 flex flex-col self-center h-1/4 justify-around items-center">
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-around grow items-center"
      >
        <h2> Log In</h2>
        <input
          type="text"
          placeholder="Username"
          className="rounded"
          onClick={(e) => (userInfo.current.username = e.target.value)}
        />
        <input
          type="text"
          className="rounded"
          placeholder="Password"
          onClick={(e) => (userInfo.current.password = e.target.value)}
        />
        <button type="submit" className="rounded bg-teal-500">
          {" "}
          Log In{" "}
        </button>
      </form>

      <button
        className="bg-red-600 rounded"
        role="backdoor"
        onClick={() => navigate("/app")}
      >
        {" "}
        Take me to the app!{" "}
      </button>
    </div>
  );
};
