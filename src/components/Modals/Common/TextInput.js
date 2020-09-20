import React from 'react';

function TextInput(props) {

  const inputNames = {
    firstName: 'First Name:',
    lastName: 'Last Name:',
    directionId: 'Direction',
    education: 'Education',
    startDate: 'Start date:',
    email: 'Email',
    university: 'University',
    mathScore: 'Math Score',
    adress: 'Adress',
    mobilePhone: 'mobilePhone',
    skype: 'Skype',
  };

  return (
    <li>
      <label htmlFor={props.inputName}>
        {inputNames[props.inputName]}
        <input
          type='text'
          name={props.inputName}
          value={props.value || ''}
          onChange={props.handleChange}
        />
      </label>
    </li>
  );
}

export default TextInput;