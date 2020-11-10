import React from 'react';
import PropTypes from 'prop-types';
import './checkInputList.scss';
import { AvGroup } from 'availity-reactstrap-validation';
import CheckBox from './CheckBox';

const CheckInputList = ({ title, handleRadioInput, values, modalType, dataTemplate }) => {
  const createList = (data) => {
    return data.map((user) => {
      const { fullName, userId } = user;
      return (
        <li key={userId}>
          <CheckBox
            inputName={fullName}
            value={userId}
            checked={values.includes(userId)}
            modalType={modalType}
            handleRadioInput={handleRadioInput}
          />
        </li>
      );
    });
  };

  return (
    <AvGroup check>
      <p className='checkBoxListTitle'>{title}</p>
      <ul className='radioInputList'>{createList(dataTemplate)}</ul>
    </AvGroup>
  );
};

CheckInputList.propTypes = {
  handleRadioInput: PropTypes.func,
  value: PropTypes.string,
  modalType: PropTypes.string,
};

CheckInputList.defaultProps = {
  value: '',
  modalType: 'view',
};

export default CheckInputList;
