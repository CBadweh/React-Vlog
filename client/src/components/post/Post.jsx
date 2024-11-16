import "./post.css"
import { Link } from "react-router-dom";

export default function Post({ post }) {
  // allow React component to gain access to api/image folder
  const PF = "http://localhost:5000/images/";

  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat"> {c}</span>
          ))}
        </div>
        {/* Reroute to singlePost with the specified id when title is clicked */}
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  )
}

