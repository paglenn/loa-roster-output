import React from "react";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
const App = () => {
  return (
    <div>
      <HashRouter basename="">
        <Routes>
          {/* Login Route Here */}
          <Route path="/" element={<MainContainer />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
