import React from "react";
import { AvField } from "availity-reactstrap-validation";
import "./dropDownInput.scss";

class DropDownInput extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  onChange(event) {
    console.log(this.props);
  }

  render() {
    const { handleDropInput } = this.props;
    console.log(this.props)
    return (
      <AvField className="dropDownInput" type="select" name="select" label="Direction:" onChange={handleDropInput}>
        <option></option>
        <option>React</option>
        <option>Angular</option>
        <option>Java</option>
        <option>.NET</option>
      </AvField>
    );
  }

}

export default DropDownInput;