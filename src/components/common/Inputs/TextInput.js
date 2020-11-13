import React from 'react';
import validatorsManager from '../../helpers/validators/validatorsManager';
import inputNamesStore from './inputNamesStore';
import './textInput.scss';
import { AvFeedback, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../../contexts/ThemeContext';

class TextInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      value: null,
      status: 'invalid',
      message: 'Please enter this data!',
    };
    this.validator = this.validator.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      value,
    });
  }

  validator = (value) => {
    const { isValidated } = this.props;

    if (!isValidated) {
      return true;
    }
    if (value) {
      const { inputName } = this.props;
      const { isValid } = validatorsManager(inputName, value);
      return isValid;
    }
    return false;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { value: prevValue } = prevProps;
    const { value, inputName, handleValidInput } = this.props;

    if (value !== prevValue) {
      if (value) {
        const { isValid, message, status } = validatorsManager(inputName, value);
        // return current input name & its status to parent:
        handleValidInput(inputName, isValid, value);
        this.setState({
          message,
          status,
        });
      } else {
        this.setState({
          status: 'invalid',
          message: 'Please enter this data!',
        });
      }
    }
  }

  render() {
    const { inputName, handleChange, value, type, modalType, isValidated } = this.props;
    const { message } = this.state;
    const { theme } = this.context;
    return (
      <AvGroup className='textInputContainer'>
        <Label for={inputName}>{inputNamesStore[inputName] + (isValidated ? '*' : '')}</Label>
        <AvInput
          disabled={modalType === 'view'}
          className={`${theme} textInput`}
          required={isValidated}
          type={type}
          name={inputName}
          value={value || ''}
          onChange={handleChange}
          validate={{ myValidation: this.validator.bind(this) }}
        />
        <AvFeedback>{message}</AvFeedback>
      </AvGroup>
    );
  }
}

TextInput.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  modalType: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleValidInput: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  value: '',
  type: '',
  modalType: '',
};

TextInput.contextType = ThemeContext;
export default TextInput;
