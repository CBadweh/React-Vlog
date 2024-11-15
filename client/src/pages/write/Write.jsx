import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
    // React State
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context); // Context API 

    // <form> submit callback handle
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create new post
        const newPost = {
            username: user.username, //using Context API
            title,
            desc,
        };
        if (file) {
            // adding image to the post
            const data = new FormData();
            const filename = Date.now() + file.name; // include the Date.now() to make the file unique
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename; // append image to newPost object
            try {
                await axios.post("/upload", data);  // upload image using multer to api/images folder in api/index.js
            } catch (err) { }
        }
        try {
            const res = await axios.post("/posts", newPost); // add new post (username, title, desc, photo) to DB
            window.location.replace("/post/" + res.data._id); // reroute write page to the new post singlePost 
        } catch (err) { }
    };
    return (
        <div className="write">
            {/* Upload the image and display it on the singlePost dashboard */}
            {file && (
                <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
            )}
            {/* For uplaod button, Title, Description, and Publish button */}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput"> <i className="writeIcon fas fa-plus"></i> </label> {/* + icon */}
                    <input type="file" id="fileInput" style={{ display: "none" }} // upload image using Inline CSS
                        onChange={(e) => setFile(e.target.files[0])}       //Show the Image on Dashbaord after upload from local       
                    />
                    <input type="text" placeholder="Title" className="writeInput" autoFocus={true} //cursor auto in to enter text
                        onChange={e => setTitle(e.target.value)}            //Show the Title live as update
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder="Tell your story..." type="text" className="writeInput writeText" 
                    onChange={e => setDesc(e.target.value)}></textarea>
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}
