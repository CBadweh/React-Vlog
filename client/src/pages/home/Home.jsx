// import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation(); // for searching query localhost:3000/?user=cbadweh
  // console.log(posts)
  useEffect(() => {
    const fetchPosts = async () => {
      // if we don't have any query (/?name=value) fetch all post, 
      // else fetch the post with the query
      const res = await axios.get("/posts" + search); 
      // console.log(res)
      setPosts(res.data);

    }
    fetchPosts()
  }, [search]); // add as dependancies 
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>

  )
}


