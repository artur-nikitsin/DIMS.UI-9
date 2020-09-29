import React from "react";
import TextInput from "../../../common/Inputs/TextInput";
import RadioInput from "../../../common/Inputs/RadioInput";
import "./inputListCreator.scss";
import validatorsManager from "../../../helpers/validators/validatorsManager";

class InputListCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      radioInputValue: null,
      status: "invalid",
      message: "Please enter sex!"
    };
    this.handleRadioInput = this.handleRadioInput.bind(this);
  }

  componentDidMount() {

    const { modalData } = this.props;
    if (modalData) {
      const { sex } = modalData;
      this.setState({
        radioInputValue: sex
      });
    }
  }


  handleRadioInput(event) {
    const { name } = event.target;
    this.setState({
      radioInputValue: name
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    const prevSubmit = prevProps.isSubmit;
    const { isSubmit, handleValidInput } = this.props;

    if (isSubmit !== prevSubmit) {

      const { radioInputValue } = this.state;
      if (radioInputValue) {
        handleValidInput("sex", true, radioInputValue);

      } else {
        this.setState({
          status: "invalid",
          message: "Please enter sex!"
        });
      }
    }
  }

  render() {
    let inputList = [];
    const data = this.props.modalData;

    for (let input in this.props.modalTemplate) {
      if (input === "sex") {
        inputList.push(
          <li key={input} className='sexInputs'>
            <div className='radioInputs'>
              <span>Sex:</span>
              <RadioInput inputName='male' value={this.state.radioInputValue}
                          handleRadioInput={this.handleRadioInput} />
              <RadioInput inputName='female' value={this.state.radioInputValue}
                          handleRadioInput={this.handleRadioInput} />
            </div>
          </li>
        );
      } else {

        inputList.push(
          <li key={input} className="inputItem">
            <TextInput
              className={"inputField"}
              inputName={input}
              value={data ? data[input] : ""}
              handleValidInput={this.props.handleValidInput}
              isSubmit={this.props.isSubmit}
              handleUnSubmit={this.props.handleUnSubmit}
            />
          </li>
        );
      }
    }

    return (
      <ul className='userRegisterInputList'>
        {inputList}
      </ul>
    );
  }


}

export default InputListCreator;