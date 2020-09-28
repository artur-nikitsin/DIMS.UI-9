import React from "react";
import "./buttons.scss";

class TrackButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { userId } = this.props;
    return (
      <button className='taskTrackButton' id={userId}>
        Track
      </button>
    );
  }
}

export default TrackButton;
