import { useState } from "react";
import Comment from "./comment.js";

let commentsArray = [
  {
    id: 1,
    content: "test comment parent 1",
    createdAt: "2022-11-01T00:00:00.000Z",
    parentId: null,
    items: [
      {
        id: 2,
        content: "test comment child 1",
        createdAt: "2022-10-01T00:00:00.000Z",
        parentId: 1,
        items: [],
      },
      {
        id: 3,
        content: "test comment child 2",
        createdAt: "2022-01-03T00:00:00.000Z",
        parentId: 1,
        items: [],
      },
    ],
  },
  {
    id: 4,
    content: "test comment parent 2",
    createdAt: "2023-06-09T00:00:00.000Z",
    parentId: null,
    items: [],
  },
];

const insertItem = function (node, commentId, content) {
  // if you find the node, modify it and return it
  // if you dont find, run the same function again
  // by iterating over the child notes
  if (node.id === commentId) {
    const newNode = {
      ...node,
      items: [
        ...node.items,
        {
          id: Date.now(),
          createdAt: new Date().toISOString(),
          content,
          parentId: commentId,
          items: [],
        },
      ],
    };

    return newNode;
  } else {
    let newItemsArray = node.items.map((itemNode) => {
      return insertItem(itemNode, commentId, content);
    });

    return { ...node, items: newItemsArray };
  }
};

export default function Comments() {
  const [comments, setComments] = useState(commentsArray);

  function onCommentAdd(commentId, content) {
    // iterate over the comments array and pass all
    // items to the recursive function insertItem

    const newComments = comments.map((itemNode) => {
      return insertItem(itemNode, commentId, content);
    });

    // const newComments = insertItem(comments, commentId, content);
    setComments(newComments);
  }

  return (
    <div className="container">
      {comments.map((comment) => {
        return (
          <Comment
            comment={comment}
            key={comment.id}
            onCommentAdd={onCommentAdd}
          />
        );
      })}
    </div>
  );
}

