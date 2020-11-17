import React, { useRef } from 'react';
import { Label } from 'reactstrap';
import inputNamesStore from '../inputNamesStore';
import './textArea.scss';

const TextArea = ({ modalType, inputName, value, handleChange, handleValidInput, isDefaultValid }) => {
  const refCheckBox = useRef('');

  const handleOnChange = (event) => {
    const { value } = refCheckBox.current;
    handleValidInput(inputName, true, value);
    handleChange(event);
  };

  return (
    <Label className='textAreaLabel' for={inputName}>
      {inputNamesStore[inputName]}
      <textarea
        ref={refCheckBox}
        className='textArea'
        readOnly={modalType === 'view'}
        required={!isDefaultValid}
        name={inputName}
        value={value || ''}
        onChange={handleOnChange}
      />
    </Label>
  );
};
export default TextArea;
