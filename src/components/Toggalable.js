import { useState, forwardRef, useImperativeHandle } from "react";

const Toggalable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const showOnVisible = { display: visible ? "" : "none" };
  const hideOnVisible = { display: visible ? "none" : "" };
  const visibleToggle = () => {
    setVisible(!visible);
  };
  useImperativeHandle(refs, () => {
    return {
      visibleToggle,
    };
  });
  return (
    <>
      <div style={showOnVisible}>
        {props.children}
        <button onClick={visibleToggle}>{props.btn1}</button>
      </div>
      <div style={hideOnVisible}>
        <button onClick={visibleToggle}>{props.btn2}</button>
      </div>
    </>
  );
});

export default Toggalable;
