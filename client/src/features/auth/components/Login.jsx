// Login Component
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../utils/handleLogin";
import { BackDoorButton } from "./Backdoor";
import { PasswordField } from "./PasswordField";
export const Login = ({ setUser }) => {
  const emailAddress = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [incorrect, setIncorrect] = useState(false); // used to display message for incorrect login credentials
  const user = localStorage.getItem("user");
  const [isPasswordShown, setPasswordShown] = useState(false);
  // if there is already a user, just navigate to the app
  useEffect(() => {
    if (user && user !== "test") {
      setUser(user);
      navigate("/app");
    }
  }, []);
  // the submit handler at this level willuse the reference values to set whether the user is authenticated and navigate.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailAddress.current || !password.current) {
      setIncorrect(true);
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
          className="rounded text-white grow-0 bg-transparent border-b-2 border-white self-stretch pl-5"
          onChange={(e) => (emailAddress.current = e.target.value)}
        />
        <PasswordField
          isShown={isPasswordShown}
          passwordRef={password}
          description="password"
          showHandler={() => {
            setPasswordShown(!isPasswordShown);
          }}
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
        type="button"
        className="bg-cyan-600 rounded"
        role="reroute-signup"
        onClick={() => navigate("/signup")}
      >
        First time here? Sign up!
      </button>

      {user === "test" ? (
        <BackDoorButton setUser={setUser} navigate={navigate} />
      ) : null}
    </div>
  );
};
