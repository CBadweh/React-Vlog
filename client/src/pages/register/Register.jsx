import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
import "./register.css"

export default function Register() {
  // States for user info 
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false);

  // Function called when Register button is pressed to register user in MonngodB.
  // Register user with React instead of Postman
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      // Register new user from React instead of Postman
      const res = await axios.post("/auth/register", {username, email, password,});
      console.log(res)
      res.data && window.location.replace("/login"); // if we successfuly registered, reroute to Login page
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}> {/* Call handleSubmit() when register button is submitted */}
        <label>Username</label>
        <input className="registerInput" type="text"
          placeholder="Enter your username..."
          onChange={e => setUsername(e.target.value)} //update the usename state with the input
        />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..."
          onChange={e => setEmail(e.target.value)}   //update the email state with the input
        />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..."
          onChange={e => setPassword(e.target.value)}  //update the password state with the input
        />
        <button className="registerButton" type="submit">Register</button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">Login</Link> {/* reroute to login page, path is define in App.js */}
      </button>
      {/* if there's a error in Regiestering (ie username is already taken), display the message below under Register button */}
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  )
}

/*
import { Link } from "react-router-dom"
import "./register.css"

export default function Register() {
    return (
      <div className="register">
          <span className="registerTitle">Register</span>
          <form className="registerForm">
            <label>Username</label>
            <input className="registerInput" type="text" placeholder="Enter your username..." />
            <label>Email</label>
            <input className="registerInput" type="text" placeholder="Enter your email..." />
            <label>Password</label>
            <input className="registerInput" type="password" placeholder="Enter your password..." />
            <button className="registerButton">Register</button>
          </form>
          <button className="registerLoginButton">
            <Link className="link" to ="/login">Login</Link> 
            </button>
            </div>
          )
      }
 */