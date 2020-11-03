import React from 'react';
import PropTypes from 'prop-types';
import './radioInputList.scss';
import { AvGroup } from 'availity-reactstrap-validation';
import CheckBox from './CheckBox';

const RadioInputList = ({ handleRadioInput, values, modalType, dataTemplate }) => {
  const createList = (data) => {
    return data.map((user) => {
      const { fullName, userId } = user;
      console.log(user);
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
