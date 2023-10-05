// Login Component
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../utils/handleLogin";
import { BackDoorButton } from "./Backdoor";
export const Login = ({ setUser }) => {
  const emailAddress = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [incorrect, setIncorrect] = useState(false); // used to display message for incorrect login credentials
  const user = localStorage.getItem("user");
  // the submit handler at this level willuse the reference values to set whether the user is authenticated and navigate.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailAddress.current || !password.current) {
      setIncorrect(true);
      console.log("incomplete login information");
      return;
    }

    let auth = await handleLogin({
      email: emailAddress.current,
      password: password.current,
    });
    if (auth.auth) {
      setUser(auth.username);
      localStorage.setItem("user", auth.username);
      navigate("/app");
    } else setIncorrect(true);
  };

  return (
    <div className="rounded-lg bg-slate-700 text-slate-50 flex flex-col self-center h-1/2 lg:w-1/5 justify-around text-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-around grow items-center"
      >
        <h2> Log In</h2>
        <input
          type="text"
          placeholder="Email Address"
          className="rounded text-black"
          onChange={(e) => (emailAddress.current = e.target.value)}
        />

        <input
          type="password"
          className="rounded text-black"
          placeholder="Password"
          onChange={(e) => (password.current = e.target.value)}
        />
        {incorrect ? (
          <p className="text-red-600 bg-white">
            {" "}
            Incorrect username or password!{" "}
          </p>
        ) : null}
        <button type="submit" role="login" className="rounded bg-teal-500">
          {" "}
          Log In{" "}
        </button>
      </form>
      <button
        className="bg-cyan-600 rounded"
        role="reroute-signup"
        onClick={() => navigate("/signup")}
      >
        First time here? Sign up!
      </button>

      {/* Backdoor is commented out  */}
      {user === "test" ? (
        <BackDoorButton setUser={setUser} navigate={navigate} />
      ) : null}
    </div>
  );
};
