import React from "react";
import "./loginForm.scss";
import TextInput from "../common/Inputs/TextInput";
import SubmitButton from "../common/Buttons/SubmitButton/SubmitButton";
import { loginTemplate as inputsStatus } from "./FormTemplate";
import formValidator from "../helpers/FormValidator/formValidator";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { login } from "../../firebase/auth";
import Preloader from "../common/Preloader/Preloader";

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputsStatus,
      email: null,
      password: null,
      loading: false,
      isSubmit: false,
      isFailLogin: false,
      message: null
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
      isSubmit: true,
      loading: true
    });

    const { isFormValid } = this.state;
    if (isFormValid) {

      const { email, password } = this.state;
      login(email, password)
        .then((response) => {

          const { role } = response;
          if (role) {
            this.setState({
              loading: false
            });
            this.props.handleLogin(response);
          } else {
            const { message } = response;
            this.setState({
              loading: false,
              isFailLogin: true,
              message: message
            });
          }
        });
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

    const { email, password, isSubmit, loading, isFailLogin, message } = this.state;

    return (

      loading ? <Preloader /> :

        <div className='loginForm'>
          <div className='loginFormBody'>
            {isFailLogin && <p>{message}</p>}
            <AvForm className='userForm'>
              <ul className='loginFormInputList'>

                <li><TextInput inputName="email" type="text" value={this.state.email} handleChange={this.handleChange}
                               handleValidInput={this.handleValidInput} isSubmit={isSubmit} /></li>
                <li><TextInput inputName="password" type="password" value={password} handleChange={this.handleChange}
                               handleValidInput={this.handleValidInput} isSubmit={isSubmit} /></li>
                <li><SubmitButton handleSubmit={this.handleSubmit} /></li>
                {/*<li><SubmitButton handleSubmit={this.props.handleLogin} /></li>*/}

              </ul>
            </AvForm>
          </div>
        </div>

    );
  }
}

export default LoginForm;
