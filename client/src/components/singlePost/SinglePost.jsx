import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router"
import { Link } from "react-router-dom";
import "./singlepost.css"

export default function SinglePost() {

      // allow React component to gain access to api/image folder
    const PF = "http://localhost:5000/images/";

  // get post id from its location
    const location = useLocation()
    const path = location.pathname.split("/")[2] // split the string and get only the ID

    // State for differnt post properties 
    const [post, setPost] = useState({});

    // Axios API to get post from DB
    useEffect(() => {
        const getPost = async () => {
            // get the post in DB
            const res = await axios.get("/posts/" + path);
            setPost(res.data); // update post state from DB
        };
        getPost(); //
    }, [path]);

    return (
        <div className="singlePost">
            {/* single post */}
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={PF + post.photo} alt="" className="singlePostImg" />
                )}
                <h1 className="singlePostTitle">
                    {post.title}
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    {/* when username is click, route to all the username posts using qurry /?user=username*/}
                    <span className="singlePostAuthor">Author: 
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                    </span>   
                    
                    <span className="singlePostAuthor">{new Date(post.createdAt).toDateString()}</span>
                </div>
                <p className="singlePostDesc">
                    {post.desc}
                </p>
            </div>
        </div>
    )
}


