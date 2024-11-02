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
  // Add User Login or Not Logic for Routine different pages
  const user = true;
  return (
    <Router> 
      <TopBar/> 
      <Routes>
        <Route exact path="/" element={<Home/>} />
        {/* if user logins, reroute <Register> page to <Home/> */}
        <Route path="/register" element={user? <Home/> : <Register/>} /> 
        <Route path="/login" element={user? <Home/> : <Login/>} />
        {/* if user logins, route to <Write> else reroute to <Register> */}
        <Route path="/write" element={user? <Write/> : <Register/>} /> 
        <Route path="/settings" element={user? <Settings/> : <Register/>} />
        <Route path="/post/:postID" element={<Single/>} />
      </Routes>

    </Router>
  );
}

export default App;
