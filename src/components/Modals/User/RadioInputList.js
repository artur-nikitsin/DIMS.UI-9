import React from 'react';
import RadioInput from '../../common/Inputs/RadioInput';
import './radioInputsList.scss';

function RadioInputList({ name, value, handleRadioInput, isSubmit, handleValidInput, modalType }) {
  return (
    <li key={name} className='sexInputs'>
      <div className='radioInputs'>
        <span>Sex:</span>

        <RadioInput
          inputName='male'
          value={value}
          handleRadioInput={handleRadioInput}
          handleValidInput={handleValidInput}
          modalType={modalType}
        />
        <RadioInput
          inputName='female'
          value={value}
          handleRadioInput={handleRadioInput}
          handleValidInput={handleValidInput}
          modalType={modalType}
        />

        <div className='validationMessage'>
          <p className='submitMessage'>{isSubmit && !value ? 'Please, enter sex' : null}</p>
        </div>
      </div>
    </li>
  );
}

export default RadioInputList;
