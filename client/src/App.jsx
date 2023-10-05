import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import { Login, Signup } from "./features/auth";
import Header from "./components/Header";
const App = () => {
  const [user, setUser] = useState("test");
  return (
    <div className=" bg-slate-800 flex flex-col h-screen">
      <Header />
      <div className="flex flex-col justify-center grow">
        <BrowserRouter basename="">
          <Routes>
            {/* Authentication Routes */}
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            {/* Main Application Page */}
            <Route path="/app" element={<MainContainer user={user} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
