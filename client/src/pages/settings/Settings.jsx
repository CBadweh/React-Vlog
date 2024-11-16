import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {

  // INIT REACT STATE
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State for if updating username,email,and password is successful
  const [success, setSuccess] = useState(false); 

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  // UPDATE USER
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" }); // Context API
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    // if we update the image
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) { }
    }
    try {
      console.log("Yo")
      // UPDATE user info in DB. Use Context API
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" }); // case for failing to update
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
            <label htmlFor="fileInput"> <i className="settingsPPIcon far fa-user-circle"></i> </label>
            <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          </div>

          {/* UPDATE user's Username, Email, and Password React State */}
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />

          {/* // Update Button. if update is successful, return the succes message <span/> */}
          <button className="settingsSubmit" type="submit"> Update </button>
          {success && (
            <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}> Profile has been updated... </span>)}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}


/*
import Sidebar from "../../components/sidebar/Sidebar"
import "./settings.css"

export default function Settings() {
  return (
    <div className="settings">
      <div className="settingsWrapper">
          <div className="settingsTitle">
              <span className="settingsTitleUpdate">Update Your Account</span>
              <span className="settingsTitleDelete">Delete Account</span>
          </div>
          <form  className="settingsForm">
              <label > Profile Picture</label>
              <div className="settingsPP">
                <img
                  src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="fileInput">
                  <i className="settingsPPIcon far fa-user-circle"></i>
                </label>
                <input type="file" id="fileInput" style={{display:"none"}}/>
              </div>
              <label >Username</label>
              <input type="text" placeholder="Badweh"/>
              <label >Email</label>
              <input type="email" placeholder="Badweh@gmail.com"/>
              <label >Password</label>
              <input type="password" placeholder="****"/>
              <button className="settingsSubmitButton">Update</button>
          </form>
      </div>
      <Sidebar/>
    </div>
  )
}
*/