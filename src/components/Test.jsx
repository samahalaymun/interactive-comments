import  { useContext, useState } from "react";
import { CommentContext } from "../context/CommentContext";
import VoteCard from "./VoteCard";
import AddComment from "./AddComment";
import Avatar from "./Avatar";
import ActionButton from "./ActionButton";
import CommentContent from "./CommentContent";
import Modal from "./Modal";
import moment from "moment";

function CommentCard({ comment, depth, id, parentId }) {
  const { currentUser, deleteComment } = useContext(CommentContext);
  const [status, setStatus] = useState("normal");

  const deleteCommentSubmit = () => {
    deleteComment({ id, parentId });
  };
  return (
    <>
      <div className="bg-white  p-6 rounded-lg flex gap-7 w-full">
        <VoteCard score={comment.score} commentId={id} />
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between ">
            <div className="flex flex-row items-center gap-5">
              <Avatar avatar={comment.user.image.webp} />

              <h2 className="text-dark-blue font-bold">
                {comment.user.username}
              </h2>
              {comment.user.username === currentUser.username && (
                <span className=" px-1.5 rounded-xs text-sm bg-moderate-blue text-white">
                  you
                </span>
              )}
              <span className="text-grayish-blue">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            {comment.user.username !== currentUser.username && (
              <ActionButton type="reply" onClick={() => setStatus("reply")} />
            )}
            {comment.user.username === currentUser.username && (
              <div className="flex gap-7 flex-row">
                <ActionButton
                  type="delete"
                  onClick={() => setStatus("delete")}
                />
                <ActionButton type="edit" onClick={() => setStatus("edit")} />
              </div>
            )}
          </div>
          <CommentContent
            content={comment.content}
            replyingTo={comment.replyingTo}
            isEditing={status === "edit"}
            depth={depth}
          />
        </div>
      </div>
      {status === "reply" && (
        <>
          <AddComment
            label="reply"
            type="reply"
            value={"@" + currentUser.username}
            replyTo={comment.user.username}
            parentId={parentId}
            setStatus={setStatus}
          />
          <div
            className="fixed top-0 left-0 bg-transparent z-1 w-full h-full "
            onClick={() => setStatus("normal")}
          ></div>
        </>
      )}
      {status === "edit" && (
        <div
          className="fixed top-0 left-0 bg-transparent z-1 w-full h-full "
          onClick={() => setStatus("normal")}
        ></div>
      )}
      {status === "delete" && (
        <Modal
          cancel={() => setStatus("normal")}
          confirm={deleteCommentSubmit}
        />
      )}
      {comment?.replies && comment?.replies?.length > 0 && (
        <div
          className={`grid   gap-6 pl-[13px] md:pl-[40px] md:ml-[40px] border-l-3 border-l-light-gray`}
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
