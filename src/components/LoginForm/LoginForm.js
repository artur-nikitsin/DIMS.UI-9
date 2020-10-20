import React from "react";
import "./loginForm.scss";
import TextInput from "../common/Inputs/TextInput";
import { loginTemplate as inputsStatus } from "./FormTemplate";
import formValidator from "../helpers/FormValidator/formValidator";
import { AvForm } from "availity-reactstrap-validation";
import { login } from "../../firebase/auth";
import Preloader from "../common/Preloader/Preloader";
import { Button, Alert } from "reactstrap";
import PropTypes from "prop-types";
import { RoleContext } from "../../RoleContext";
import MembersPage from "../MembersPage/MembersPage";


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
      isFormValid: false,
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

    const { isFormValid, email, password } = this.state;
    if (isFormValid) {
      this.setState({
        isSubmit: true,
        loading: true
      });

      const { handleLogin } = this.context;
      login(email, password)
        .then((response) => {

          const { role } = response;
          if (role) {
            this.setState({
              loading: false
            });
            handleLogin(response);
          } else {
            const { message } = response;
            this.setState({
              loading: false,
              isFailLogin: true,
              message
            });
          }
        });
    }
  }

  handleValidInput = (input, status) => {
    this.setState((prevState) => {
      return {
        inputsStatus: { ...prevState.inputsStatus, [input]: status },
        isFormValid: formValidator({ ...prevState.inputsStatus, [input]: status })
      };
    });
  };


  render() {

    const { email, password, isSubmit, loading, isFailLogin, message } = this.state;

    return (

      loading ? <Preloader /> :

        <div className='loginForm'>
          <p className="loginTitle">Login</p>
          <div className='loginFormBody'>
            {isFailLogin && <Alert color="danger"> {message} </Alert>}
            <AvForm className="userForm" onSubmit={this.handleSubmit}>
              <ul className='loginFormInputList'>
                <li><TextInput inputName="email" type="text" value={email} handleChange={this.handleChange}
                               handleValidInput={this.handleValidInput} isSubmit={isSubmit} /></li>
                <li><TextInput inputName="password" type="password" value={password} handleChange={this.handleChange}
                               handleValidInput={this.handleValidInput} isSubmit={isSubmit} /></li>
                <li><Button className="loginButton" color="secondary"
                            size="lg">Login</Button></li>
              </ul>
            </AvForm>
          </div>
        </div>

    );
  }
}

LoginForm.propTypes = {};

LoginForm.contextType = RoleContext;
export default LoginForm;
