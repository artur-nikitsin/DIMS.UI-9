import React from "react";
import "./loginForm.scss";
import TextInput from "../common/Inputs/TextInput";
import SubmitButton from "../common/Buttons/SubmitButton/SubmitButton";
import { loginTemplate as inputsStatus } from "./FormTemplate";
import formValidator from "../helpers/FormValidator/formValidator";

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputsStatus,
      email: null,
      password: null,
      isSubmit: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }


  handleSubmit() {
    this.setState({
      isSubmit: true
    });

    if (this.state.isFormValid) {
      this.props.handleLogin();
    }
  }

  handleValidInput = (input, status, data) => {

    let { inputsStatus } = this.state;

    inputsStatus[input] = status;

    this.setState({
      isFormValid: formValidator(inputsStatus)
    });
  };


  render() {

    const { handleLogin } = this.props;
    const { email, password, isSubmit } = this.state;

    return (
      <div className='loginForm'>
        <div className='loginFormBody'>
          <ul className='loginFormInputList'>
            <li><TextInput inputName="email" value={this.state.email} handleChange={this.handleChange}
                           handleValidInput={this.handleValidInput} isSubmit={isSubmit} /></li>
            <li><TextInput inputName="password" value={password} handleChange={this.handleChange}
                           handleValidInput={this.handleValidInput} isSubmit={isSubmit} /></li>
            <li><SubmitButton handleSubmit={this.handleSubmit} /></li>
          </ul>
        </div>
      </div>
    );
  }


}

export default LoginForm;
