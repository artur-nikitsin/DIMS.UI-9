import React from 'react';
import PropTypes from 'prop-types';
import { AvField } from 'availity-reactstrap-validation';
import './dropDownInput.scss';

class DropDownInput extends React.PureComponent {
  render() {
    const { handleDropInput, value, modalType } = this.props;
    return (
      <AvField
        className='dropDownInput'
        disabled={modalType === 'view'}
        type='select'
        name='select'
        label='Direction:'
        onChange={handleDropInput}
        value={value}
      >
        <option />
        <option value='1'>React</option>
        <option value='2'>Angular</option>
        <option value='3'>Java</option>
        <option value='4'>.NET</option>
      </AvField>
    );
  }
}

DropDownInput.propTypes = {
  handleDropInput: PropTypes.func.isRequired,
  value: PropTypes.string,
  modalType: PropTypes.string,
};

DropDownInput.defaultProps = {
  value: '',
  modalType: 'view',
};

export default DropDownInput;
