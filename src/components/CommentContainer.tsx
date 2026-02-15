import { Comment } from "@/types/snippet";

export const buildCommentTree = (flatComments: any[]): Comment[] => {
  const map: { [key: string]: any } = {};
  const tree: Comment[] = [];

  flatComments.forEach(comment => {
    map[comment.id] = { ...comment, replies: [] };
  });

  flatComments.forEach(comment => {
    if (comment.parent_id) {
      map[comment.parent_id].replies.push(map[comment.id]);
    } else {
      tree.push(map[comment.id]);
    }
  });

  return tree;
};