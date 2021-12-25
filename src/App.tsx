import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login/index";
import './App.scss'
// import '../styles/global.css'

// import Layout from '../containers/Layout'
// import Home from '../pages/Home'
// import Login from '../containers/Login'
// import RecoveryPassword from '../containers/RecoveryPassword'
// import NotFound from '../pages/NotFound'

const App = () => {
  return (
    <Router>
      {/* <Layout> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<Login/>}/>
          <Route path="/recovery-password" element={<RecoveryPassword/>}/>
          <Route path="*" element={<NotFound/>}/> */}
      </Routes>
      {/* </Layout> */}
    </Router>
  );
};

export default App;
