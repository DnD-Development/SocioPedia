import React from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import { Posts } from "../../dummydata";
import "./feed.scss";

function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((p) => (
          <Post post={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
