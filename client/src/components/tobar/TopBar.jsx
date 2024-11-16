
import { Link } from "react-router-dom";
import "./topbar.css"
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  // Add User Login or Not Logic for different Headers
  // const user = false;
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"


  // call back function for logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft"> 
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>

      <div className="topCenter">
        {/* Rerouse Header to specified pages */}
        <ul className="topList">
          <li className="topListItem"><Link className="link" to="/">HOME</Link></li>
          <li className="topListItem"><Link className="link" to="/">ABOUT</Link></li>
          <li className="topListItem"><Link className="link" to="/">CONTACT</Link></li>
          <li className="topListItem"><Link className="link" to="/write">WRITE</Link></li>
          <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li> {/* If there's a user loggined, display LOGOUT, else shows nothing */}
        </ul>
      </div>

      <div className="topRight"> 
        {/* Display IMG or LOGIN REGISTER dependinon if user logins */}
        {user ? (
          // clicking on the image reroutes to setting page
            <Link className="link" to="/settings">
              <img
                className="topImg"
                // src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                src = {PF + user.profilePic} // profilePic from DB, but DB needs to know api/imagese Public Folder (PF)
                alt=""
              />
            </Link>
          ) : (
            <ul className="topList">
              <li className="topListItem"><Link className="link" to="/login">LOGIN</Link></li>
              <li className="topListItem"><Link className="link" to="/register">REGISTER</Link></li>
            </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  )
}
