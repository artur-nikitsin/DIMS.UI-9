import React from 'react';
import RadioInput from '../../common/Inputs/RadioInput/RadioInput';
import './genderInputs.scss';

function GenderInputs({ name, value, handleChange, isSubmit, handleValidInput, modalType }) {
  return (
    <li key={name} className='genderInputs'>
      <div className='radioInputs'>
        <span>Sex:</span>

        <RadioInput
          label='male'
          name={name}
          value={'male'}
          handleChange={handleChange}
          handleValidInput={handleValidInput}
          modalType={modalType}
          checked={value === 'male'}
        />
        <RadioInput
          label='female'
          name={name}
          value={'female'}
          handleChange={handleChange}
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
