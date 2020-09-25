import React from "react";
import "./loginForm.scss";
import TextInput from "../common/Inputs/TextInput";
import SubmitButton from "../common/Buttons/SubmitButton/SubmitButton";

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isSubmit: false
    });
  }

  isValid = {
    email: false,
    password: false
  };

  handleValidInput = (input, status) => {

    this.isValid[input] = status;

    let statusArr = [];
    for (let input in this.isValid) {
      statusArr.push(this.isValid[input]);
    }

    if (!statusArr.includes(false)) {
      this.setState({
        isFormValid: true
      });
    }

  };

  render() {

    const { handleLogin } = this.props;
    const { email, password } = this.state;

    return (
      <div className='loginForm'>
        <div className='loginFormBody'>
          <ul className='loginFormInputList'>
            <li><TextInput inputName="email" value={this.state.email} handleChange={this.handleChange}
                           handleValidInput={this.handleValidInput} /></li>
            <li><TextInput inputName="password" value={password} handleChange={this.handleChange}
                           handleValidInput={this.handleValidInput} /></li>
            <li><SubmitButton handleSubmit={handleLogin} /></li>
          </ul>
        </div>
      </div>
    );
  }


}

export default LoginForm;
