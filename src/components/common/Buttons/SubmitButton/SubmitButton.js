import React from "react";
import "./submitButton.scss";

function SubmitButton({ handleSubmit }) {
  return (
    <button className='submitButton' onClick={handleSubmit}>
      Submit
    </button>
  );
}

export default SubmitButton;
