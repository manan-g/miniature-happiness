import React from "react";
import "./Input.css";
export default function Input(props) {
  return (
    <div>
      <input
        className="_input"
        onChange={(e) => {
          props.set_state(e.target.value);
        }}
        placeholder={props.placeholder}
        type={props.type != null ? props.type : "text"}
      />
      <br />
    </div>
  );
}
