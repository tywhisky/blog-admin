import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Drawn from "../src/components/Drawn/index";
import Login from "../src/pages/Login/index";
import Dashboard from "../src/pages/Dashboard/index";

import "./App.scss";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<Drawn />}>
              <Route path="/dashboard" element={<Dashboard />} />
          </Route>
      </Routes>
    </Router>
  );
};

export default App;
