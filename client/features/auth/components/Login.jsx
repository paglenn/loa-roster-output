import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../utils/handleLogin";
export const Login = ({ submitHandler }) => {
  const userInfo = useRef({});
  const navigate = useNavigate();
  const [incorrect, setIncorrect] = useState(false); // used to display message for incorrect login credentials

  // the submit handler at this level willuse the reference values to set whether the user is authenticated and navigate. 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.current.username || !userInfo.current.password) {
      setIncorrect(true);
      console.log("incomplete login information");
      return;
    }

    let auth = await handleLogin(userInfo);
    if (auth) navigate("/app");
    else setIncorrect(true);
  };

  return (
    <div className="rounded-lg bg-slate-700 text-slate-50 flex flex-col self-center h-1/2 w-1/5 justify-around text-3xl">
      <form
        onSubmit={handleSubmit}
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
        {incorrect ? (
          <p className="text-red-600 bg-white">
            {" "}
            Incorrect username or password!{" "}
          </p>
        ) : null}
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
