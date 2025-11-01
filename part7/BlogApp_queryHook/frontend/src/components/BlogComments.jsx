function BlogComments({ comments }) {
  if (!comments || comments.length === 0)
    return <p className="my-2">No comments yet.</p>;

  return (
    <ul className="list-disc w-fit mx-auto">
      {comments.map((c, index) => (
        <li key={index}>{c}</li>
      ))}
    </ul>
  );
}

export default BlogComments;
