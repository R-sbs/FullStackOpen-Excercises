export const Footer = () => {
  return (
    <div className="py-2 flex items-center justify-between">
      <div className="">
        Anecdote app for{" "}
        <a href="https://fullstackopen.com/">Full Stack Open</a>.
      </div>
      <div className="">
        See{" "}
        <a
          href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js"
          className="underline text-blue-500"
        >
          Here
        </a>{" "}
        for the source code.
      </div>
    </div>
  );
};
