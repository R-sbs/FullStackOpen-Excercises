import { useState } from "react";
import { useField } from "../hooks.js/useField";

export const CreateNew = (props) => {
  const contentField = useField("text");
  const authorField = useField("text");
  const infoField = useField("url");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contentField.inputProps.value) {
      props.addNew({
        content: contentField.inputProps.value,
        author: authorField.inputProps.value,
        info: infoField.inputProps.value,
        votes: 0,
      });
      handleReset();
    }
  };

  const handleReset = () => {
    contentField.reset();
    authorField.reset();
    infoField.reset();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold uppercase mb-2">
        create a new anecdote
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="my-4 capitalize">
          content *
          <input name="content" {...contentField.inputProps} />
        </div>
        <div className="my-4 capitalize">
          author
          <input name="author" {...authorField.inputProps} />
        </div>
        <div className="my-4 capitalize">
          url for more info
          <input name="info" {...infoField.inputProps} />
        </div>
        <button className=" bg-black text-white px-6 py-3 uppercase font-semibold text-center rounded-lg my-4 shadow-xs hover:shadow-lg hover:font-bold">
          create
        </button>
        <button
          type="reset"
          onClick={handleReset}
          className="bg-red-400 text-white px-6 py-3 uppercase font-semibold text-center rounded-lg my-4 shadow-xs hover:shadow-lg hover:font-bold mx-4"
        >
          Reset
        </button>
      </form>
    </div>
  );
};
