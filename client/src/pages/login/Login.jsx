import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom"
import { Context } from "../../context/Context";
import "./login.css"

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  // Function called when Login in submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Using dispatch to call LOGIN_START action in Reducer.js and update isFatching = true
    dispatch({ type: "LOGIN_START" });
    try {
      // API call to passing username and password to Login 
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      // if login succes, run LOGIN_SUCCESS in Reducer.js
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      // if login fail
      dispatch({ type: "LOGIN_FAILURE" });
    }}

  console.log(user)
  // console.log(isFetching)



  return (
    <div className="login">
      {/* login */}
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input type="password" className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">Register</Link> {/* reroute to register page, path is define in App.js */}
      </button>
    </div>
  )
}
