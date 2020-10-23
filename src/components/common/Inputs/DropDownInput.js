import React from "react";
import { AvField } from "availity-reactstrap-validation";
import "./dropDownInput.scss";



class DropDownInput extends React.PureComponent {

  constructor(props) {
    super(props);
  }


  render() {
    const { handleDropInput } = this.props;
    return (
      <AvField className="dropDownInput" type="select" name="select" label="Direction:" onChange={handleDropInput}>
        <option></option>
        <option value={"1"}>React</option>
        <option value={"2"}>Angular</option>
        <option value={"3"}>Java</option>
        <option value={"4"}>.NET</option>
      </AvField>
    );
  }

}

export default DropDownInput;