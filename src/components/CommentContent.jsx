import { useContext, useState } from "react";
import PostButton from "./PostButton";
import { CommentContext } from "../context/CommentContext";

function CommentContent({
  content,
  replyingTo,
  isEditing,
  setStatus,
  id,
  parentId,
}) {
  const { updateComment } = useContext(CommentContext);
  const [text, setText] = useState(
    replyingTo ? `@${replyingTo}.` + content : content
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const newContent = text.replace(`@${replyingTo}.`, "").trim();
    let updatedComment = { content: newContent, id, parentId };
    updateComment(updatedComment);
    setStatus("normal");
  };
  if (isEditing) {
    return (
      <form
        className="z-2 flex flex-col gap-4 comment__content"
        onSubmit={onSubmit}
      >
        <textarea
          required
          type="text"
          name="comment"
          className="w-full rounded-lg text-grayish-blue caret-dark-blue border border-light-gray min-h-[100px] py-3 px-5 focus:border-moderate-blue focus:outline-dark-blue active:border-dark-blue"
          value={text}
          autoFocus={true}
          onFocus={(e) =>
            (e.currentTarget.selectionStart = e.currentTarget.value.length)
          }
          spellCheck={false}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <PostButton label="Update" type="submit" />
        </div>
      </form>
    );
  } else {
    return (
      <p className="text-grayish-blue comment__content">
        {replyingTo && (
          <strong className="text-moderate-blue font-semibold">
            @{replyingTo}&nbsp;
          </strong>
        )}
        {content}
      </p>
    );
  }
}

export default CommentContent;
