import React from "react";
import "./radioInput.scss";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox
} from "availity-reactstrap-validation";
import { Button, Label, FormGroup, CustomInput, Input } from "reactstrap";

class RadioInput extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      status: "invalid",
      message: "Please enter sex!"
    };

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    const prevValue = prevProps.value;
    const { handleValidInput } = this.props;
    const { value } = this.props;
    if (value !== prevValue) {
      handleValidInput("sex", true, value);
    }
  }

  render() {
    const { inputName, value, handleRadioInput } = this.props;
    return (
      <div className='radioButton'>

        <Input type="radio"
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