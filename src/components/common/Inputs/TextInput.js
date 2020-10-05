import React from "react";
import validatorsManager from "../../helpers/validators/validatorsManager";
import inputNamesStore from "./inputNamesStore";
import "./textInput.scss";
import { AvForm, AvField, AvFeedback, AvGroup, AvInput } from "availity-reactstrap-validation";
import { Button, Label, FormGroup, CustomInput } from "reactstrap";

class TextInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      value: null,
      status: "invalid",
      valid: false,
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


  validation(value, ctx) {
    const { isSubmit } = this.props;
    if (value) {
      const { inputName } = this.props;
      const { isValid } = validatorsManager(inputName, value);
      return isValid;
    }
    return false;
  }


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
          status: status,
          valid: isValid
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

    const { inputName, handleChange, value, isSubmit, type } = this.props;
    const { message } = this.state;
    return (

      <AvGroup className="textInputContainer">
        <Label for={inputName}>{inputNamesStore[inputName]}</Label>
        <AvInput
          className="textInput"
          required
          type={type}
          name={inputName}
          value={value || ""}
          onChange={handleChange}
          validate={{ myValidation: this.validation.bind(this) }}
        />
        <AvFeedback>{message}</AvFeedback>
      </AvGroup>

    );
  }
}

export default TextInput;