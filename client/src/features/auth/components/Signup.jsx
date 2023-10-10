import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignup } from "../utils/handleSignup";
import { BackDoorButton } from "./Backdoor";
import { PasswordField } from "./PasswordField";
export const Signup = ({ setUser }) => {
  const emailAddress = useRef();
  const username = useRef();
  const password = useRef();
  const password2 = useRef();

  const navigate = useNavigate();
  const [incorrect, setIncorrect] = useState(false); // used to display message for incorrect login credentials
  const [taken, setTaken] = useState(false); // used to display message for incorrect login credentials
  const [passwordMisMatch, setPasswordMisMatch] = useState(false);
  const [isPassword1Shown, setPassword1Shown] = useState(false);
  const [isPassword2Shown, setPassword2Shown] = useState(false);

  const user = localStorage.getItem("user");
  // the submit handler at this level willuse the reference values to set whether the user is authenticated and navigate.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailAddress.current || !password.current) {
      setIncorrect(true);
      return;
    } else if (password.current !== password2.current) {
      setPasswordMisMatch(true);
      return;
    }

    const auth = await handleSignup({
      email: emailAddress.current,
      username: username.current,
      password: password.current,
    });
    if (auth.auth) {
      setUser(auth.username);
      localStorage.setItem("user", auth.username);
      navigate("/app");
    } else setTaken(true);
  };

  return (
    <div className="rounded-lg bg-slate-700 text-slate-50 flex flex-col self-center h-1/2 w-1/5 justify-around text-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-around grow items-center"
      >
        <h2> Sign Up </h2>
        <input
          type="text"
          placeholder="Email Address"
          className="rounded text-black"
          onChange={(e) => (emailAddress.current = e.target.value)}
        />
        <input
          type="text"
          placeholder="Username (Optional)"
          className="rounded text-black"
          onChange={(e) => (username.current = e.target.value)}
        />
        <input
          type="password"
          className="rounded text-black"
          placeholder="Password"
          onChange={(e) => (password.current = e.target.value)}
        />
        <input
          type="password"
          className="rounded text-black"
          placeholder="Re-Enter Password"
          onChange={(e) => (password2.current = e.target.value)}
        />
        {incorrect ? <IncompleteMessage /> : null}
        {passwordMisMatch ? <MismatchMessage /> : null}
        {taken ? <TakenMessage /> : null}
        <button role="signup" type="submit" className="rounded bg-teal-500">
          {" "}
          Sign Up{" "}
        </button>
      </form>
      <button
        className="bg-cyan-600 rounded"
        role="reroute-login"
        onClick={() => navigate("/")}
      >
        Have an account? Log In!
      </button>
      {user === "test" ? (
        <BackDoorButton setUser={setUser} navigate={navigate} />
      ) : null}
    </div>
  );
};

const IncompleteMessage = () => {
  return (
    <p className="text-red-600 bg-white">Must enter both email and password!</p>
  );
};
const TakenMessage = () => {
  return (
    <p className="text-red-600 bg-white">Email or username already exists</p>
  );
};
const MismatchMessage = () => {
  return (
    <p className="text-red-600 bg-white"> Entered passwords must match! </p>
  );
};
