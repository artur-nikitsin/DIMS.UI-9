import React from 'react';
import './editDeleteButtons.scss';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

function EditDeleteButtons({ handleEdit, handleDelete }) {
  return (
    <div className='buttonsContainer'>
      <Button outline color='secondary' className='editButton' onClick={handleEdit}>
        Edit
      </Button>
      <Button outline color='danger' className='deleteButton' onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}

EditDeleteButtons.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default EditDeleteButtons;
