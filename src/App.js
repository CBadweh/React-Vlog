import TopBar from "./components/tobar/TopBar"
import Home from "./pages/home/Home"
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    // chage the react fragments to Router
    <Router> 
      <TopBar/> 
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/write" element={<Write/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/post/:postID" element={<Single/>} />
      </Routes>

    </Router>
  );
}

export default App;
