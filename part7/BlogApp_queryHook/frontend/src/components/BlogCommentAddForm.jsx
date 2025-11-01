import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blog";

const BlogCommentForm = ({ blogId }) => {
  const queryClient = useQueryClient();

  const addComment = async ({ blogId, comment }) => {
    const res = await blogService.addComment(blogId, comment);
    return res;
  };

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", blogId]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    mutation.mutate({ blogId, comment });
    e.target.comment.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border p-1 rounded-md"
        name="comment"
        placeholder="Add a comment"
      />
      <button
        className="bg-black text-white p-1 px-2 rounded-md mx-4"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default BlogCommentForm;
