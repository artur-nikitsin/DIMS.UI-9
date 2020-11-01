import React from 'react';
import './checkBox.scss';
import PropTypes from 'prop-types';

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
        <label className='checkBoxLabel' htmlFor={inputName}>
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
