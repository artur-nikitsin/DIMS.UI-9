import React from "react";
import "./radioInput.scss";

class RadioInput extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      status: "invalid",
      message: "Please enter sex!"
    };

  }


  render() {
    const { inputName, value, handleRadioInput } = this.props;
    return (
      <div className='radioButton'>
        <input
          type='radio'
          name={inputName}
          checked={value === inputName}
          value={value || ""}
          onChange={handleRadioInput}
        />
        <label htmlFor='userMale'>{inputName}</label>
      </div>
    );
  }
}

export default RadioInput;