import React from "react";
import "./buttons.scss";

class StatusButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { userId } = this.props;
    return (
      <div className='statusButtonsGroup'>
        <button className='successStatusButton' id={userId}>
          Success
        </button>
        <button className='failStatusButton' id={userId}>
          Fail
        </button>
      </div>
    );
  }
}

export default StatusButtons;
