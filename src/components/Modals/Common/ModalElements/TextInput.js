import React from "react";
import validatorsManager from "../../../helpers/validators/validatorsManager";
import "./textInput.scss";

class TextInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "invalid",
      message: "Please enter data!"
    };
  }

  inputNames = {
    firstName: "First Name:",
    lastName: "Last Name:",
    directionId: "Direction",
    education: "Education",
    startDate: "Start date:",
    deadLineDate: 'Deadline date',
    email: "Email",
    university: "University",
    mathScore: "Math Score",
    adress: "Adress",
    mobilePhone: "mobilePhone",
    skype: "Skype",
    name: "Name"
  };


  componentDidUpdate(prevProps) {

    if (this.props.value !== prevProps.value) {

      if (this.props.value) {
        this.props.handleValidInput(this.props.inputName, validatorsManager(this.props.inputName, this.props.value).isValid);
        this.setState({
          message: validatorsManager(this.props.inputName, this.props.value).message,
          status: validatorsManager(this.props.inputName, this.props.value).status
        });
      } else {
        this.setState({
          message: "",
          status: "valid"
        });
      }
    }
  }

  render() {

    return (
      <li className={`textInput ${this.props.isSubmit? this.state.status: null}`}>
        <label htmlFor={this.props.inputName}>
          {this.inputNames[this.props.inputName]}
          <input
            type='text'
            name={this.props.inputName}
            value={this.props.value || ""}
            onChange={this.props.handleChange}
          />
        </label>
        <div className={`validationMessage ${this.state.status}`}>
          <p>{this.props.isSubmit ? this.state.message : null}</p>
        </div>
      </li>
    );
  }
}

export default TextInput;