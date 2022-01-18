import { useState, useEffect } from "react";
import axios from "axios";
import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.scss";

function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(`sdfjkaslfdsjdkfhskadhi`);
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/61e50743954ba5906b4a8c8d");

      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post post={p} key={p._id} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
