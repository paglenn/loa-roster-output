import React, { useState } from "react";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import { Login } from "./features/auth/components/Login";
import Header from "./components/Header";
const App = () => {
  const [user, updateUser] = useState(null);
  return (
    <div className=" bg-slate-800 flex flex-col h-screen">
      <Header />
      <div className="h-5/6 flex flex-col">
        <HashRouter basename="">
          <Routes>
            {/* Login Route Here */}
            <Route path="/" element={<Login />} />
            <Route path="/app" element={<MainContainer />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
};

export default App;
