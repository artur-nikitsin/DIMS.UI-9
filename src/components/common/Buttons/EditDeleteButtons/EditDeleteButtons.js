import React from "react";
import "./editDeleteButtons.scss";

function EditDeleteButtons(props) {
  return (
    <div className='buttonsContainer'>
      <button className='editButton' onClick={props.handleEdit}>Edit</button>
      <button className='deleteButton' onClick={props.handleDelete}>Delete</button>
    </div>
  );
}

export default EditDeleteButtons;
