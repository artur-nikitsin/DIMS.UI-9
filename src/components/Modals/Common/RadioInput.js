import React from 'react';

function RadioInput(props) {


  return (

    <div className='radioButton'>
      <input
        type='radio'
        name={props.inputName}
        checked={props.value === props.inputName}
        value={props.value || ''}
        onChange={props.handleRadioInput}
      />
      <label htmlFor='userMale'>{props.inputName}</label>
    </div>
  );
}

export default RadioInput;