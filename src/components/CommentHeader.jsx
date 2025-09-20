import Avatar from "./Avatar";
import moment from "moment";

function CommentHeader({ avatar, username, isYou, date }) {
  return (
    <div className="flex flex-row items-center gap-5 comment__header">
      <Avatar avatar={avatar} width="w-8" height="h-8" />

      <h2 className="text-dark-blue font-bold flex gap-2 items-center">
        <span>{username}</span>
        {isYou && (
          <span className=" px-1.5 text-center py-[3px] font-normal  rounded-xs text-xs bg-moderate-blue text-white">
            you
          </span>
        )}
      </h2>

      <span className="text-grayish-blue">{moment(date).fromNow()}</span>
    </div>
  );
}

export default CommentHeader;
