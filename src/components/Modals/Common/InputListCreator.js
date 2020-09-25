import React from "react";
import TextInput from "../../common/Inputs/TextInput";
import RadioInput from "./ModalElements/RadioInput";
import "./inputListCreator.scss";

class InputListCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      radioInputValue: null
    };
    this.handleRadioInput = this.handleRadioInput.bind(this);
  }

  componentDidMount() {

    const data = this.props.modalData;
    if (data) {
      const sexValue = data.sex;
      this.setState({
        radioInputValue: sexValue
      });
    }
  }
  

  handleRadioInput(event) {
    const { name } = event.target;
    this.setState({
      radioInputValue: name
    });
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