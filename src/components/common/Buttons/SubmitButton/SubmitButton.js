import React from 'react';
import './submitButton.scss';
import PropTypes from 'prop-types';
import EditDeleteButtons from '../EditDeleteButtons/EditDeleteButtons';

function SubmitButton({ handleSubmit }) {
  return (
    <button className='submitButton' onClick={handleSubmit}>
      Submit
    </button>
  );
}

EditDeleteButtons.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default SubmitButton;
