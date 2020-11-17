import React from 'react';
import './checkBox.scss';
import PropTypes from 'prop-types';

class CheckBox extends React.PureComponent {
  render() {
    const { inputName, inputId, value = '', handleRadioInput, modalType, checked } = this.props;
    return (
      <div className='checkBoxContainer'>
        <input
          className='checkBox'
          type='checkbox'
          disabled={modalType === 'view'}
          name={inputName}
          id={inputId}
          checked={checked}
          value={value}
          onChange={handleRadioInput(value)}
        />
        <label className='checkBoxLabel' htmlFor={inputId}>
          {inputName}
        </label>
      </div>
    );
  }
}

CheckBox.propTypes = {
  value: PropTypes.string,
  modalType: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  handleRadioInput: PropTypes.func,
};

CheckBox.defaultProps = {
  value: '',
  modalType: 'view',
};
export default CheckBox;
