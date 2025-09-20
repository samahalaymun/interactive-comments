import  { createContext } from "react";
import data from "../../data.json";
import useLocalStorage from "../hooks/useLocalStorage";
const CommentContext = createContext({});

const CommentContextProvider = (props) => {
  const [comments, setComments] = useLocalStorage("comments", data.comments);
  const currentUser = data.currentUser;

  const updateScore = (commentId, action) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          score: comment.score + (action === "upvote" ? 1 : -1),
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === commentId
              ? {
                  ...reply,
                  score: reply.score + (action === "upvote" ? 1 : -1),
                }
              : reply
          ),
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };
  const addNewComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
  };
  const addNewReply = (newReply) => {
    console.log(newReply);
    
    const updatedComments = comments.map((comment) => {
      if (comment.id === newReply.parentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply.reply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };
  const deleteComment = (comment) => {
    let updatedComments = [];
    if (comment.parentId) {
      updatedComments = comments.map((item) => {
        if (item.id === comment.parentId) {
          console.log("delete this reply");
          const replies = item.replies.filter(
            (reply) => reply.id !== comment.id
          );
          return { ...item, replies: replies };
        } else {
          return item;
        }
      });
    } else {
      updatedComments = comments.filter((item) => item.id !== comment.id);
    }
    setComments(updatedComments);
  };

  const updateComment=(comment)=>{
     console.log(comment)
      let updatedComments = [];
      if (comment.parentId) {
        updatedComments = comments.map((item) => {
          if (item.id === comment.parentId) {
            console.log("update this reply");
            const replies = item.replies.map(
              (reply) =>{
                if(reply.id === comment.id ){
                  reply.content=comment.content
                }
                return reply
              }
            );
            return { ...item, replies: replies };
          } else {
            return item;
          }
        });
      } else {
        updatedComments = comments.map((item) => {
          if(item.id === comment.id){
            item.content=comment.content
          }
          return item
        });
      }
      setComments(updatedComments);
  }
  function getNewId() {
    let id = 0;
    for (const comment of comments) {
      if (comment.id > id) {
        id = comment.id;
        for (const reply of comment.replies) {
          if (reply.id > id) {
            id = reply.id;
          }
        }
      }
    }

    return id + 1;
  }

  return (
    <CommentContext.Provider
      value={{
        comments,
        currentUser,
        updateScore,
        getNewId,
        addNewComment,
        addNewReply,
        deleteComment,
        updateComment,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};
export { CommentContextProvider, CommentContext };
