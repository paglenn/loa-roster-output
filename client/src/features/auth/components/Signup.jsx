import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignup } from "../events/handleSignup";
import { BackDoorButton } from "./BackdoorButton";
import { PasswordField } from "./PasswordField";
import { usePasswordShown } from "../hooks/usePasswordShown";
import { ProblemMessage } from "./ProblemMessage";
import { useDispatch } from "react-redux";
import { login } from "../../../state/userSlice";

const Signup = ({ setUser }) => {
  const emailAddress = useRef();
  const username = useRef();
  const password = useRef();
  const password2 = useRef();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [incorrect, setIncorrect] = useState(false); // used to display message for incorrect login credentials
  const [taken, setTaken] = useState(false); // used to display message for incorrect login credentials
  const [passwordMisMatch, setPasswordMisMatch] = useState(false);
  const [isPassword1Shown, flipPassword1] = usePasswordShown(false);
  const [isPassword2Shown, flipPassword2] = usePasswordShown(false);

  const user = localStorage.getItem("user");
  const onSuccess = () => {
    dispatch(login(auth.username));
    localStorage.setItem("user", auth.username);
    navigate("/app");
  };
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
      onSuccess();
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
          className="rounded text-white grow-0 bg-transparent border-b-2 border-white self-stretch px-5"
          onChange={(e) => (emailAddress.current = e.target.value)}
        />
        <input
          type="text"
          placeholder="Username (Optional)"
          className="rounded text-white grow-0 bg-transparent border-b-2 border-white self-stretch px-5"
          onChange={(e) => (username.current = e.target.value)}
        />
        <PasswordField
          isShown={isPassword1Shown}
          showHandler={flipPassword1}
          description={"Password"}
          passwordRef={password}
        />
        <PasswordField
          isShown={isPassword2Shown}
          showHandler={flipPassword2}
          description={"Re-Enter Password"}
          passwordRef={password2}
        />

        {incorrect ? (
          <ProblemMessage text="You must enter both email and password 😊" />
        ) : null}
        {passwordMisMatch ? (
          <ProblemMessage text="Entered passwords must match 😮" />
        ) : null}
        {taken ? (
          <ProblemMessage text="Email/Username already exists 🤔" />
        ) : null}
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

export default Signup;
