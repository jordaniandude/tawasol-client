import React, { useState } from "react";
import { addComment } from "../../redux/modules/posts";
import { connect } from "react-redux";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };

  return (
    <div className="post-card">
      <p className="form-title center">Leave a comment</p>
      <hr></hr>
      <form className="" onSubmit={onSubmit}>
        <div>
          <textarea
            placeholder="Enter your comment"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <input type="submit" value="Post" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default connect(null, { addComment })(CommentForm);
