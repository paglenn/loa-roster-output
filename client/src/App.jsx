import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import MainPage from "./displays/MainPage";
import { Login, Signup, autoLogin } from "./features/auth";
import Header from "./components/Header";
import PricesPage from "./displays/PricesPage";
import { usePrices } from "./features/edit_prices";
import { updatePrices } from "./utils/reference";
import { update_prices } from "./state/pricesSlice";
import { useDispatch } from "react-redux";
const App = () => {
  const [user, setUser] = useState("");
  //const [prices, updatePrices] = usePrices();
  const dispatch = useDispatch();
  // on mount, try to automatically log in the user
  useEffect(() => {
    updatePrices().then((prices) => dispatch(update_prices(prices)));
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
            <Route
              path="/prices"
              element={
                <PricesPage
                  user={user}
                  setUser={setUser}
                  update={updatePrices}
                />
              }
            />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
};

export default App;
