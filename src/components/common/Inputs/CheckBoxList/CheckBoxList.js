import React from 'react';
import PropTypes from 'prop-types';
import './checkBoxList.scss';
import { AvGroup } from 'availity-reactstrap-validation';
import CheckBox from '../CheckBox/CheckBox';

const CheckBoxList = ({ title, handleRadioInput, values, modalType, dataTemplate }) => {
  const createList = (data) => {
    return data.map((user) => {
      const { fullName, userId } = user;

      return (
        <li key={userId}>
          <CheckBox
            inputName={fullName}
            value={userId}
            checked={!!values[userId] && !!values[userId].assign}
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

CheckBoxList.propTypes = {
  handleRadioInput: PropTypes.func,
  value: PropTypes.string,
  modalType: PropTypes.string,
};

CheckBoxList.defaultProps = {
  value: '',
  modalType: 'view',
};

export default CheckBoxList;