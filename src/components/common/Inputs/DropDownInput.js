import React from 'react';
import PropTypes from 'prop-types';
import { AvField } from 'availity-reactstrap-validation';
import './dropDownInput.scss';

const DropDownInput = ({ handleDropInput, value, modalType, dataTemplate }) => {
  const createList = (data) => {
    const names = Object.keys(data);
    const list = names.map((name) => {
      return <option value={data[name]}>{name}</option>;
    });
    return list;
  };

  return (
    <AvField
      className='dropDownInput'
      disabled={modalType === 'view'}
      type='select'
      name='select'
      label='Direction:'
      onChange={handleDropInput}
      value={value}
    >
      {createList(dataTemplate)}
    </AvField>
  );
};

DropDownInput.propTypes = {
  handleDropInput: PropTypes.func.isRequired,
  value: PropTypes.string,
  modalType: PropTypes.string,
};

DropDownInput.defaultProps = {
  value: '',
  modalType: 'view',
};

export default DropDownInput;
