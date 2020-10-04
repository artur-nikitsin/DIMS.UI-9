import React from "react";
import "./editDeleteButtons.scss";
import { Button } from "reactstrap";

function EditDeleteButtons(props) {
  return (
    <div className='buttonsContainer'>
      <Button outline color="secondary" className='editButton' onClick={props.handleEdit}>Edit</Button>
      <Button outline color="danger" className='deleteButton' onClick={props.handleDelete}>Delete</Button>
    </div>
  );
}

export default EditDeleteButtons;
