import React from "react";
import "./loginForm.scss";
import TextInput from "../common/Inputs/TextInput";
import SubmitButton from "../common/Buttons/SubmitButton/SubmitButton";
import { loginTemplate as inputsStatus } from "./FormTemplate";
import formValidator from "../helpers/FormValidator/formValidator";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { login } from "../../firebase/auth";

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
    /* this.setState({
       isSubmit: true
     });

     if (this.state.isFormValid) {
       this.props.handleLogin();
     }*/

    const { email, password } = this.state;
    console.log(email, password);

    login(email, password).then((response) => {
      console.log(response);
    });
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
          <AvForm className='userForm'>
            <ul className='loginFormInputList'>

              <li><TextInput inputName="email" type="text" value={this.state.email} handleChange={this.handleChange}
                             handleValidInput={this.handleValidInput} isSubmit={isSubmit} /></li>
              <li><TextInput inputName="password" type="password" value={password} handleChange={this.handleChange}
                             handleValidInput={this.handleValidInput} isSubmit={isSubmit} /></li>
              <li><SubmitButton handleSubmit={this.handleSubmit} /></li>
              {/*<li><SubmitButton handleSubmit={this.props.handleLogin} /></li>*/}

              {/*  <li><TextInput inputName="email" value={this.state.email} handleChange={this.handleChange}
                           handleValidInput={this.handleValidInput} isSubmit={isSubmit} /></li>
            <li><TextInput inputName="password" value={password} handleChange={this.handleChange}
                           handleValidInput={this.handleValidInput} isSubmit={isSubmit} /></li>
            <li><SubmitButton handleSubmit={this.handleSubmit} /></li>
            <li><SubmitButton handleSubmit={this.props.handleLogin} /></li>*/}
            </ul>
          </AvForm>
        </div>
      </div>
    );
  }


}

export default LoginForm;
