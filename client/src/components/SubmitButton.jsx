import React from "react";
import "./SubmitButton.css";
export default function SubmitButton(props) {
  return (
    <div>
      <input
        className="_input_submit_button"
        type="submit"
        value={props.text}
      />
    </div>
  );
}
