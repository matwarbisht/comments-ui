import { useState } from "react";

export default function Comment({ comment, onCommentAdd }) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [reply, setReply] = useState("");

  const handleReplySubmit = () => {
    setIsReplyOpen(false);
    setReply("");
    onCommentAdd(comment.id, reply);
  };

  const handleReplyCancel = () => {
    setIsReplyOpen(false);
    setReply("");
  };

  const handleInputChange = (event) => {
    setReply(event.target.value);
  };

  const handleKeyPressDown = (event) => {
    if (event.key === "Enter") {
      if (reply.length > 0) {
        handleReplySubmit();
      } else handleReplyCancel();
    } else if (event.key === "Escape") {
      handleReplyCancel();
    }
  };

  const createdDateString = new Date(comment.createdAt).toLocaleString();
  const isTopLevel = comment.parentId === null;

  return (
    <div className={`comment-with-children${!isTopLevel ? " nested" : ""}`}>
      <div className={`comment-container`}>
        <img src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" />
        <div className="comment">
          <span className="comment-content">{comment.content}</span>
          <span className="comment-date">{createdDateString}</span>
        </div>
        <div className="comment-reply">
          {isReplyOpen ? (
            <div className="input-container">
              <input
                type="text"
                autoFocus
                value={reply}
                className="reply-input"
                onChange={handleInputChange}
                onKeyDown={handleKeyPressDown}
              />
              <div className="action-button-container">
                <button onClick={handleReplyCancel}>Cancel</button>
                <button onClick={handleReplySubmit}>Submit</button>
              </div>
            </div>
          ) : (
            <button
              className="reply-button"
              onClick={() => setIsReplyOpen(!isReplyOpen)}
            >
              Reply
            </button>
          )}
        </div>
      </div>
      {comment.items &&
        comment.items.length > 0 &&
        comment.items.map((item) => {
          return (
            <Comment comment={item} key={item.id} onCommentAdd={onCommentAdd} />
          );
        })}
    </div>
  );
}
