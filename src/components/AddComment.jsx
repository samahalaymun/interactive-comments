import { useContext, useState } from "react";
import Avatar from "./Avatar";
import { CommentContext } from "../context/CommentContext";
import PostButton from "./PostButton";

function AddComment({ label, type, replyTo, parentId, setStatus }) {
  const url = import.meta.env.BASE_URL;
  const { currentUser, getNewId, addNewComment, addNewReply } =
    useContext(CommentContext);
  const [text, setText] = useState(type === "reply" ? `@${replyTo}.` : "");

  const onSubmit = (e) => {
    e.preventDefault();
    if (type === "comment") {
      let newComment = {
        id: getNewId(),
        content: text.trim(),
        createdAt: new Date().toJSON(),
        score: 0,
        user: currentUser,
        replies: [],
      };
      addNewComment(newComment);
      setText("");
    } else {
      const newContent = text.replace(`@${replyTo}.`, "").trim();
      let newReply = {
        parentId,
        reply: {
          id: getNewId(),
          content: newContent,
          createdAt: new Date().toJSON(),
          score: 0,
          replyingTo: replyTo,
          user: currentUser,
        },
      };
      addNewReply(newReply);
      setStatus("normal");
    }
  };

  return (
    <form
      className="bg-white flex-wrap md:flex-nowrap p-6 rounded-lg flex justify-between gap-4 w-full z-2"
      onSubmit={onSubmit}
    >
      <textarea
        required
        type="text"
        name="comment"
        className="w-full md:order-2 md:flex-1  rounded-lg text-grayish-blue caret-dark-blue border border-light-gray min-h-[100px] py-3 px-5 focus:border-moderate-blue focus:outline-moderate-blue active:border-moderate-blue"
        placeholder="Add comment..."
        value={text}
        autoFocus={type === "reply" ? true : false}
        onFocus={(e) =>
          (e.currentTarget.selectionStart = e.currentTarget.value.length)
        }
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />
      <Avatar
        avatar={url + currentUser.image.webp}
        height="h-10"
        width="w-10"
      />
      <div className="md:order-3">
        <PostButton label={label} type="submit" />
      </div>
    </form>
  );
}

export default AddComment;
