import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import MainPage from "./displays/MainPage";
import { Login, Signup } from "./features/auth";
import Header from "./components/Header";
import { checkAdmin } from "./utils/api";
const App = () => {
  const currentUser = localStorage.getItem("user") ?? "";
  const [user, setUser] = useState("");
  useEffect(() => {
    if (currentUser !== "test") setUser(currentUser);
    else if (checkAdmin()) setUser(currentUser);
  }, []);
  return (
    <div className=" bg-slate-800 flex flex-col h-screen">
      <Header />
      <div className="flex flex-col justify-center grow">
        <HashRouter basename="/">
          <Routes>
            {/* Authentication Routes */}
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            {/* Main Application Page */}
            <Route
              path="/app"
              element={<MainPage user={user} setUser={setUser} />}
            />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
};

export default App;
