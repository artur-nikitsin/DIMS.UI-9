import React from 'react';
import './loginForm.scss';
import { AvForm } from 'availity-reactstrap-validation';
import { Button, Alert } from 'reactstrap';
import TextInput from '../common/Inputs/TextInput/TextInput';
import { loginTemplate as inputsStatus } from './FormTemplate';
import formValidator from '../helpers/FormValidator/formValidator';
import { login } from '../../firebase/auth';
import Preloader from '../common/Preloader/Preloader';
import { RoleContext } from '../../contexts/RoleContext';

import { loginWithProvider } from '../../firebase/auth';

class LoginForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputsStatus,
      email: null,
      password: null,
      loading: false,
      isSubmit: false,
      isFailLogin: false,
      isConnectLogin: false,
      isFormValid: false,
      message: null,
      connectAnotherProvider: false,
      provider: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { isFormValid, email, password, connectAnotherProvider, provider } = this.state;
    if (isFormValid) {
      this.setAuthLoading();
      login(email, password, connectAnotherProvider, provider).then((response) => {
        this.setAuthResponse(response);
      });
    }
  }

  loginWithProvider = (provider) => () => {
    this.setAuthLoading();
    loginWithProvider(provider).then((response) => {
      if (response.dimsLoginFirst) {
        if (response.email) {
          this.handleValidInput('email', true);
          this.setState({
            email: response.email,
          });
        }
        this.setState({
          email: response.email,
          loading: false,
          isConnectLogin: true,
          message: 'To connect another auth provider please first enter auth data for your DIMS account',
          connectAnotherProvider: true,
          provider,
        });
      } else {
        this.setAuthResponse(response);
      }
    });
  };

  setAuthLoading() {
    this.setState({
      isSubmit: true,
      loading: true,
    });
  }

  setAuthResponse(response) {
    const { handleLogin } = this.context;
    const { role } = response;
    if (role) {
      handleLogin(response);
    } else {
      const { message } = response;
      this.setState({
        loading: false,
        isFailLogin: true,
        message,
      });
    }
  }

  handleValidInput = (input, status) => {
    this.setState((prevState) => {
      return {
        inputsStatus: { ...prevState.inputsStatus, [input]: status },
        isFormValid: formValidator({ ...prevState.inputsStatus, [input]: status }),
      };
    });
  };

  render() {
    const { email, password, isSubmit, loading, isFailLogin, isConnectLogin, message } = this.state;

    return loading ? (
      <Preloader />
    ) : (
      <div className='loginForm'>
        <p className='loginTitle'>Login</p>
        <div className='loginFormBody'>
          {isFailLogin && <Alert color='danger'>{message}</Alert>}
          {isConnectLogin && <Alert color='primary'>{message}</Alert>}
          <AvForm className='userForm' onSubmit={this.handleSubmit}>
            <ul className='loginFormInputList'>
              <li>
                <TextInput
                  inputName='email'
                  type='text'
                  value={email}
                  handleChange={this.handleChange}
                  handleValidInput={this.handleValidInput}
                  isSubmit={isSubmit}
                />
              </li>
              <li>
                <TextInput
                  inputName='password'
                  type='password'
                  value={password}
                  handleChange={this.handleChange}
                  handleValidInput={this.handleValidInput}
                  isSubmit={isSubmit}
                />
              </li>
              <li>
                <Button className='loginButton' color='secondary' size='lg'>
                  Login
                </Button>
              </li>
            </ul>
          </AvForm>

          {/*//////////////////////////*/}
          <button onClick={this.loginWithProvider('google')}>google</button>
          <button onClick={this.loginWithProvider('twitter')}>twitter</button>
          <button onClick={this.loginWithProvider('facebook')}>facebook</button>
          <button onClick={this.loginWithProvider('github')}>github</button>
          {/*//////////////////////////////*/}
        </div>
      </div>
    );
  }
}

LoginForm.contextType = RoleContext;
export default LoginForm;
