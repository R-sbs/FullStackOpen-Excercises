import { useState } from "react";

const Toggalable = (props) => {
    const [visible, setVisible] = useState(false);
    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
      setVisible(!visible);
    };


    return (
      <div className="">
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <a className="hover:border p-2 rounded-sm text-white! cursor-pointer" onClick={toggleVisibility}>cancel</a>
        </div>
      </div>
    );
  };

  export default Toggalable