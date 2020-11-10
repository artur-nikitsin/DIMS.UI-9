import React from 'react';
import { Label } from 'reactstrap';
import inputNamesStore from '../inputNamesStore';
import './textArea.scss';

const TextArea = ({ modalType, inputName, value, handleChange, handleValidInput }) => {
  const handleOnChange = (event) => {
    const { value } = event.target;
    handleValidInput(inputName, true, value);
    handleChange(event);
  };

  return (
    <Label className='textAreaLabel' for={inputName}>
      {inputNamesStore[inputName]}
      <textarea
        className='textArea'
        readOnly={modalType === 'view'}
        required
        name={inputName}
        value={value || ''}
        onChange={handleOnChange}
      />
    </Label>
  );
};
export default TextArea;
