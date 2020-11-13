import React from 'react';
import './radioInput.scss';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

class RadioInput extends React.PureComponent {
  render() {
    const { name, value, handleChange, modalType, label, checked } = this.props;
    return (
      <div className='radioInputWrapper'>
        <Input
          className='radioInput'
          disabled={modalType === 'view'}
          type='radio'
          name={name}
          value={value}
          onChange={handleChange}
          checked={checked}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    );
  }
}

RadioInput.propTypes = {
  value: PropTypes.string,
  checked: PropTypes.bool,
  modalType: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  handleRadioInput: PropTypes.func.isRequired,
  handleValidInput: PropTypes.func.isRequired,
};

RadioInput.defaultProps = {
  value: '',
  modalType: 'view',
};
export default RadioInput;
