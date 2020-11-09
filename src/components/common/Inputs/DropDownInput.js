import React from 'react';
import PropTypes from 'prop-types';
import { AvField } from 'availity-reactstrap-validation';
import './dropDownInput.scss';

const DropDownInput = ({ handleDropInput, value, modalType, dataTemplate, label }) => {
  const createList = (data) => {
    const list = data.map((direction) => {
      const { directionId, name } = direction;
      return (
        <option key={directionId} value={directionId}>
          {name}
        </option>
      );
    });
    return list;
  };

  return (
    <AvField
      className='dropDownInput'
      disabled={modalType === 'view'}
      type='select'
      name='select'
      label={label}
      onChange={handleDropInput}
      value={value}
    >
      <option key='default' value=''>
        --choose--
      </option>
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
