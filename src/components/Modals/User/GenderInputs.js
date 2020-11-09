import React from 'react';
import RadioInput from '../../common/Inputs/RadioInput';
import './genderInputs.scss';

function GenderInputs({ name, value, handleRadioInput, isSubmit, handleValidInput, modalType }) {
  return (
    <li key={name} className='genderInputs'>
      <div className='radioInputs'>
        <span>Sex:</span>

        <RadioInput
          inputName='male'
          value={value}
          handleRadioInput={handleRadioInput}
          handleValidInput={handleValidInput}
          modalType={modalType}
          checked={value === 'male'}
        />
        <RadioInput
          inputName='female'
          value={value}
          handleRadioInput={handleRadioInput}
          handleValidInput={handleValidInput}
          modalType={modalType}
          checked={value === 'female'}
        />

        <div className='validationMessage'>
          <p className='submitMessage'>{isSubmit && !value ? 'Please, enter sex' : null}</p>
        </div>
      </div>
    </li>
  );
}

export default GenderInputs;
