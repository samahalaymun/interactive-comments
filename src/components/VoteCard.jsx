import { useContext } from "react";
import { CommentContext } from "../context/CommentContext";

function VoteCard({ score, commentId }) {
  const url = import.meta.env.BASE_URL;
  const { updateScore } = useContext(CommentContext);
  return (
    <div className="vote justify-self-start bg-very-light-gray gap-3 py-2  lg:py-4 px-3 rounded-xl flex-row flex lg:flex-col items-center ">
      <button
        className=" border-none p-0 m-0"
        onClick={() => updateScore(commentId, "upvote")}
      >
        <img alt="plus" src={url+"/assets/icon-plus.svg"} />
      </button>
      <span className="text-moderate-blue font-bold">{score}</span>
      <button
        className="bg-none border-none p-0 m-0"
        onClick={() => updateScore(commentId, "downvote")}
      >
        <img alt="plus" src={url+"/assets/icon-minus.svg"} />
      </button>
    </div>
  );
}

export default VoteCard;
