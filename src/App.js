import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import SingleCountry from "./components/pages/SingleCountry";
function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:country" element={<SingleCountry />} />
      </Routes>
    </Fragment>
  );
}

export default App;
