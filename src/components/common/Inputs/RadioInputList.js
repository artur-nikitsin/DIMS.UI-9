import React from 'react';
import PropTypes from 'prop-types';
import './radioInputList.scss';
import { AvGroup } from 'availity-reactstrap-validation';
import CheckBox from './CheckBox';

const RadioInputList = ({ handleRadioInput, values, modalType, dataTemplate }) => {
  const createList = (data) => {
    const names = Object.keys(data);
    const list = names.map((name) => {
      const value = data[name];
      let checked = '';
      if (values.includes(value)) {
        checked = value;
      }
      return (
        <li key={value}>
          <CheckBox
            inputName={name}
            value={value}
            checked={checked}
            modalType={modalType}
            handleRadioInput={handleRadioInput}
          />
        </li>
      );
    });
    return list;
  };

  return (
    <AvGroup check>
      <ul className='radioInputList'>{createList(dataTemplate)}</ul>
    </AvGroup>
  );
};

RadioInputList.propTypes = {
  handleRadioInput: PropTypes.func,
  value: PropTypes.string,
  modalType: PropTypes.string,
};

RadioInputList.defaultProps = {
  value: '',
  modalType: 'view',
};

export default RadioInputList;
