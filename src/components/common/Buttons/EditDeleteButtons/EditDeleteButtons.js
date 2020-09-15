import React from 'react';
import './editDeleteButtons.scss';

function EditDeleteButtons() {
  return (
    <div className='buttonsContainer'>
      <button className='editButton'>Edit</button>
      <button className='deleteButton'>Delete</button>
    </div>
  );
}

export default EditDeleteButtons;
