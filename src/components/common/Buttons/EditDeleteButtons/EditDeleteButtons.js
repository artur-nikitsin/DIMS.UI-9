import React from "react";
import "./editDeleteButtons.scss";
import { Button } from "reactstrap";

function EditDeleteButtons({ handleEdit, handleDelete }) {
  return (
    <div className='buttonsContainer'>
      <Button outline color="secondary" className='editButton' onClick={handleEdit}>Edit</Button>
      <Button outline color="danger" className='deleteButton' onClick={handleDelete}>Delete</Button>
    </div>
  );
}

export default EditDeleteButtons;
