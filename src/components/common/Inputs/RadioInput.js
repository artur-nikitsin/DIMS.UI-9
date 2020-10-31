import React from 'react';
import './radioInput.scss';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

class RadioInput extends React.PureComponent {
  render() {
    const { inputName, value, handleRadioInput, modalType } = this.props;
    return (
      <div className='radioButton'>
        <Input
          disabled={modalType === 'view'}
          type='radio'
          name={inputName}
          checked={value === inputName}
          value={value || ''}
          onChange={handleRadioInput}
        />
        <label htmlFor={inputName}>{inputName}</label>
      </div>
    );
  }
}

RadioInput.propTypes = {
  value: PropTypes.string,
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
