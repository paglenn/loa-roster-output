import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import MainPage from "./displays/MainPage";
import { Login, Signup } from "./features/auth";
import Header from "./components/Header";
import PricesPage from "./displays/PricesPage";
import PricesService from "./services/PricesService";
import { updatePrices } from "./utils/reference";
import { update_prices } from "./state/pricesSlice";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  const pricesService = new PricesService();

  // on mount, update prices
  useEffect(() => {
    updatePrices().then((prices) => dispatch(update_prices(prices)));
  }, []);

  return (
    <div className=" bg-slate-800 flex flex-col h-screen overflow-scroll">
      <Header />
      <div className="flex flex-col justify-center grow">
        <BrowserRouter basename="/">
          <Routes>
            {/* Authentication Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Main Application Page */}
            <Route
              path="/app"
              element={<MainPage pricesService={pricesService} />}
            />
            {/* Page for price edits  */}
            <Route
              path="/prices"
              element={<PricesPage pricesService={pricesService} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
