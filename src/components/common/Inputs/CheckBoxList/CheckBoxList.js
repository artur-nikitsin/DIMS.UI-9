import React from 'react';
import PropTypes from 'prop-types';
import './checkBoxList.scss';
import CheckBox from '../CheckBox/CheckBox';

const CheckBoxList = ({ title, handleRadioInput, values, modalType, dataTemplate, isDefaultValid }) => {
  const createList = (data) => {
    return data.map((user) => {
      const { fullName, userId } = user;

      return (
        <li key={userId}>
          <CheckBox
            required={isDefaultValid}
            inputName={fullName}
            inputId={userId}
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
    <>
      <p className='checkBoxListTitle'>{title}</p>
      <ul className='checkBoxList'>{createList(dataTemplate)}</ul>
    </>
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
