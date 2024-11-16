import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router"
import { Link } from "react-router-dom";
import "./singlepost.css"
import { Context } from "../../context/Context";

export default function SinglePost() {

    // get post id from its location
    const location = useLocation()
    const path = location.pathname.split("/")[2] // split the string and get only the ID
    const PF = "http://localhost:5000/images/"; // allow React component to gain access to api/image folder
    const { user } = useContext(Context); // Context API 

    // (1) for updating singePost page's title and description 
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false); // update mode allow us to modify the post

    // State for differnt post properties 
    const [post, setPost] = useState({});

    // Axios API to get post info from DB
    useEffect(() => {
        const getPost = async () => {
            // get the post info from DB
            const res = await axios.get("/posts/" + path);
            // update post state, title, and desc when updateMode is ture,
            // it doesn't update DB
            setPost(res.data); 
            setTitle(res.data.title); 
            setDesc(res.data.desc);   
        };
        getPost(); //
    }, [path]);

    // DELETE POST HANDLE
    const handleDelete = async () => {
        // console.log(post.username);
        console.log(user.username)
        try {
            await axios.delete(`/posts/${post._id}`, {
                data: { username: user.username },
            });
            window.location.replace("/"); // after delete, reroute to homepage
        } catch (err) { }
    };

    // UPDATE TITLE AND DESC
    const handleUpdate = async () => {
        try {
            // update post's title and desc and saved it in DB
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false) // after Update button is pressed, change it back to read-mode
        } catch (err) { }
    };

    return (
        <div className="singlePost">
            {/* single post */}
            <div className="singlePostWrapper">

                { /* == DISPLAY PHOTO == */
                    post.photo && (<img src={PF + post.photo} alt="" className="singlePostImg" />)}

                { /* == EDIT TITLE ==
                    // if the edit mode-updateMode is true the allow edit title, else show the original post's title
                    // updateMode ? (<input>) : (<h1/>) */
                    updateMode ? (<input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e) => setTitle(e.target.value)} />) : (
                        <h1 className="singlePostTitle">
                            {title /* post.title is from the DB vs title is the React State  */}
                            {/* Context API - if post is not yours, delete and edit button will be disable */
                                post.username === user?.username && (
                                    <div className="singlePostEdit">
                                        {/* onClick={} allow us to click on the icon and call a function */}
                                        <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}> </i>
                                        <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}> </i>
                                    </div>
                                )}
                        </h1>
                    )}


                <div className="singlePostInfo">
                    {/* when username is click, route to all the username posts using qurry /?user=username*/}
                    <span className="singlePostAuthor">Author: <Link to={`/?user=${post.username}`} className="link"> <b> {post.username} </b></Link> </span>
                    <span className="singlePostAuthor">{new Date(post.createdAt).toDateString()}</span>
                </div>

                {/* // == EDIT DESCRIPTION ==
                    // if the edit mode-updateMode is true the allow edit title, else show the original post's title
                    // updateMode? (<textarea/>) : (<p/>) */
                    updateMode ? (<textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)} />) : (<p className="singlePostDesc"> {desc} </p>)}

                {/* // == UPDATE BUTTON WHEN updateMode= True ==
                1.button for updating the title and description.
                2. only update when it's  updateMode is true
                */
                updateMode && (<button className="singlePostButton" onClick={handleUpdate}>Update</button>)}
            </div>
        </div>
    )
}


