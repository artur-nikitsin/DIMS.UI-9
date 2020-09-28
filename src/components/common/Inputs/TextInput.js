import React from "react";
import validatorsManager from "../../helpers/validators/validatorsManager";
import inputNamesStore from "./inputNamesStore";
import "./textInput.scss";

class TextInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      value: null,
      status: "invalid",
      message: "Please enter data!"

    };
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    const { value } = this.props;
    this.setState({
      value: value
    });
  }

  handleChange(event) {
    const { value } = event.target;
    const { handleUnSubmit } = this.props;

    this.setState({
      value: value,
      isSubmit: false
    });
    handleUnSubmit();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    const prevSubmit = prevProps.isSubmit;
    const { isSubmit, inputName, handleValidInput } = this.props;
    const { value } = this.state;

    if (isSubmit !== prevSubmit) {
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

    const { className, isSubmit, inputName } = this.props;
    const { status, message, value } = this.state;
    return (
      <div className={`textInput ${isSubmit ? status : null}`}>
        <label htmlFor={inputName}>
          {inputNamesStore[inputName]}
          <input
            className="input"
            type='text'
            name={inputName}
            value={value || ""}
            onChange={this.handleChange}
          />
        </label>
        <div className={`validationMessage ${status}`}>
          <p className="submitMessage">{isSubmit ? message : null}</p>
        </div>
      </div>
    );
  }
}

export default TextInput;