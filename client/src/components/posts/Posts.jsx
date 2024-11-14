import Post from "../post/Post"
import "./posts.css";

export default function Posts({posts}) {
  return (
    <div className="posts">
      {posts.map(p => (
        <Post post={p}/>
      ))}
    </div>
  )
}

/*export default function Posts() {
  return (
    <div className="posts">
      <Post/>
      <Post/>
      <Post/>
    </div>
  )
}
  */