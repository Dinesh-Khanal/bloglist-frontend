import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

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
      <div style={showOnVisible} data-testid="toggalable">
        {props.children}
        <button onClick={visibleToggle}>{props.btn1}</button>
      </div>
      <div style={hideOnVisible}>
        <button onClick={visibleToggle}>{props.btn2}</button>
      </div>
    </>
  );
});
Toggalable.displayName = "Toggalable";
Toggalable.propTypes = {
  btn1: PropTypes.string.isRequired,
  btn2: PropTypes.string.isRequired,
};
export default Toggalable;
