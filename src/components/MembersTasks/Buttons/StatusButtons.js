import React from "react";
import "./buttons.scss";
import { Button } from "reactstrap";

class StatusButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { userId } = this.props;
    return (
      <div className='statusButtonsGroup'>
        <Button outline color="success" className='successStatusButton' id={userId}>
          Success
        </Button>
        <Button outline color="danger" className='failStatusButton' id={userId}>
          Fail
        </Button>
      </div>
    );
  }
}

export default StatusButtons;
