import React from 'react';
import './radioInput.scss';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

class RadioInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: 'invalid',
      message: 'Please enter sex!',
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevValue = prevProps.value;
    const { handleValidInput } = this.props;
    const { value } = this.props;
    if (value !== prevValue) {
      handleValidInput('sex', true, value);
    }
  }

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
        <label htmlFor='userMale'>{inputName}</label>
      </div>
    );
  }
}

RadioInput.propTypes = {
  value: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  handleRadioInput: PropTypes.func.isRequired,
  handleValidInput: PropTypes.func.isRequired,
};
export default RadioInput;
