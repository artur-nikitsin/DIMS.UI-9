import React from "react";
import "./radioInput.scss";

class RadioInput extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      status: "invalid",
      message: "Please enter sex!"
    };
  }


  render() {

    return (
      <div className='radioButton'>
        <input
          type='radio'
        /*  className={`radioInput ${this.props.status}`}*/
          name={this.props.inputName}
          checked={this.props.value === this.props.inputName}
          value={this.props.value || ""}
          onChange={this.props.handleRadioInput}
        />
        <label htmlFor='userMale'>{this.props.inputName}</label>
      </div>
    );
  }
}

export default RadioInput;