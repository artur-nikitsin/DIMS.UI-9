import React from 'react';
import './radioInput.scss';
import PropTypes from 'prop-types';
import { AvInput } from 'availity-reactstrap-validation';

class CheckBox extends React.PureComponent {
  render() {
    const { inputName, value, handleRadioInput, modalType, checked } = this.props;
    return (
      <div className='radioButton'>
        <input
          type='checkbox'
          disabled={modalType === 'view'}
          name={inputName}
          checked={value === checked}
          value={value || ''}
          onChange={handleRadioInput(value)}
        />
        <label htmlFor={inputName}>{inputName}</label>
      </div>
    );
  }
}

CheckBox.propTypes = {
  value: PropTypes.string,
  modalType: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  handleRadioInput: PropTypes.func.isRequired,
  handleValidInput: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  value: '',
  modalType: 'view',
};
export default CheckBox;
