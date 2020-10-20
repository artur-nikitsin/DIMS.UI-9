import React from "react";
import "./buttons.scss";
import { Button } from "reactstrap";
import { setTaskState } from "../../../firebase/apiSet";

class StatusButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  setTaskStatus = (stateId, status) => () => {
    setTaskState(stateId, status);
  };

  render() {

    const { userId, stateId } = this.props;
    return (
      <div className='statusButtonsGroup'>
        <Button outline color="success" className='successStatusButton' id={userId}
                onClick={this.setTaskStatus(stateId, "Success")}>
          Success
        </Button>
        <Button outline color="danger" className='failStatusButton' id={userId}
                onClick={this.setTaskStatus(stateId, "Fail")}>
          Fail
        </Button>
      </div>
    );
  }
}

export default StatusButtons;
