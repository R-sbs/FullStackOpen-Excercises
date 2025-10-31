import { X } from "lucide-react";
import React, { useState } from "react";

const Toggalable = React.forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  React.useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div className="relative w-full flex items-start gap-4">
      <div style={hideWhenVisible}>
        <button
          className="bg-blue-500 rounded-md px-4 py-2 text-white"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="absolute top-0 right-2">
        {props.children}
        <a
          className="bg-red-300 hover:bg-red-600 text-white rounded-full cursor-pointer absolute -top-2 -right-2 p-1"
          onClick={toggleVisibility}
        >
          <X />
        </a>
      </div>
    </div>
  );
});

export default Toggalable;
