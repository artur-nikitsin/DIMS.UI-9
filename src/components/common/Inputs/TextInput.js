import React from "react";
import validatorsManager from "../../helpers/validators/validatorsManager";
import inputNamesStore from "./inputNamesStore";
import "./textInput.scss";
import { AvFeedback, AvGroup, AvInput } from "availity-reactstrap-validation";
import { Label } from "reactstrap";
import PropTypes from "prop-types";


class TextInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      value: null,
      status: "invalid",
      message: "Please enter data!"
    };
    this.validation = this.validation.bind(this);
  }


  componentDidMount() {
    const { value } = this.props;
    this.setState({
      value: value
    });
  }


  validation = (value) => {
    if (value) {
      const { inputName } = this.props;
      const { isValid } = validatorsManager(inputName, value);
      return isValid;
    } else
      return false;
  };


  componentDidUpdate(prevProps, prevState, snapshot) {

    const { value: prevValue } = prevProps;
    const { value, inputName, handleValidInput } = this.props;

    if (value !== prevValue) {

      if (value) {
        const { isValid, message, status } = validatorsManager(inputName, value);
        //return current input name & its status to parent:
        handleValidInput(inputName, isValid, value);
        this.setState({
          message: message,
          status: status
        });
      } else {
        this.setState({
          status: "invalid",
          message: "Please enter data!"
        });
      }
    }
  }

  render() {

    const { inputName, handleChange, value, type, modalType } = this.props;
    const { message } = this.state;

    return (
      <AvGroup className="textInputContainer">
        <Label for={inputName}>{inputNamesStore[inputName]}</Label>
        <AvInput
          disabled={modalType === "view"}
          className="textInput"
          required
          type={type}
          name={inputName}
          value={value || ""}
          onChange={handleChange}
          validate={{ myValidation: this.validation }} />
        <AvFeedback>{message}</AvFeedback>
      </AvGroup>

    );
  }
}

TextInput.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleValidInput: PropTypes.func.isRequired
};

export default TextInput;