import{ useContext, useState } from "react";
import { CommentContext } from "../context/CommentContext";
import VoteCard from "./VoteCard";
import AddComment from "./AddComment";
import ActionButton from "./ActionButton";
import CommentContent from "./CommentContent";
import Modal from "./Modal";
import CommentHeader from "./CommentHeader";
import Overlay from "./Overlay";

function CommentCard({ comment, depth, id, parentId }) {
  const url = import.meta.env.BASE_URL;
  const { currentUser, deleteComment } = useContext(CommentContext);
  const [status, setStatus] = useState("normal");

  const deleteCommentSubmit = () => {
    deleteComment({ id, parentId });
  };
  console.log(url + comment.user.image.webp);
  
  return (
    <>
      <div className="bg-white comment p-4 md:p-6 rounded-lg gap-5">
        <CommentHeader
          avatar={url+comment.user.image.webp}
          date={comment.createdAt}
          isYou={comment.user.username === currentUser.username}
          username={comment.user.username}
        />
        <CommentContent
          content={comment.content}
          replyingTo={comment.replyingTo}
          isEditing={status === "edit"}
          depth={depth}
          setStatus={setStatus}
          id={id}
          parentId={parentId}
        />
        <VoteCard score={comment.score} commentId={id} />
        <span className=" comment__buttons flex gap-6 justify-self-end align-self-end">
          {comment.user.username !== currentUser.username && (
            <ActionButton type="reply" onClick={() => setStatus("reply")} />
          )}
          {comment.user.username === currentUser.username && (
            <>
              <ActionButton type="delete" onClick={() => setStatus("delete")} />
              <ActionButton type="edit" onClick={() => setStatus("edit")} />
            </>
          )}
        </span>
      </div>
      {status === "reply" && (
        <>
          <AddComment
            label="reply"
            type="reply"
            value={"@" + currentUser.username}
            replyTo={comment.user.username}
            parentId={parentId || id}
            setStatus={setStatus}
          />
          <Overlay onClick={() => setStatus("normal")} />
        </>
      )}
      {status === "edit" && <Overlay onClick={() => setStatus("normal")} />}
      {status === "delete" && (
        <Modal
          cancel={() => setStatus("normal")}
          confirm={deleteCommentSubmit}
        />
      )}
      {comment?.replies && comment?.replies?.length > 0 && (
        <div
          className={`grid gap-4 pl-[13px] md:pl-[40px] md:ml-[45px] border-l-3 border-l-light-gray`}
        >
          {comment.replies?.map((reply) => (
            <CommentCard
              comment={reply}
              replyingTo={reply.replyingTo}
              depth={depth + 1}
              id={reply.id}
              parentId={id}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default CommentCard;
