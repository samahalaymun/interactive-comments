import React, { useContext } from "react";
import data from "../../data.json";
import { CommentContext } from "../context/CommentContext";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";

function CommentsList() {
  const { comments, currentUser } = useContext(CommentContext);
  
  
  return (
    <div className="max-w-[730px] w-full grid  gap-4">
      {comments.map((comment) => (
        <CommentCard comment={comment} depth={1} id={comment.id} />
      ))}
      <AddComment label="send" type="comment"   />
    </div>
  );
}

export default CommentsList;
