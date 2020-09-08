import React from 'react';
import './buttons.css';

class TrackButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button className={'taskTrackButton'} id={this.props.userId}>
        Track
      </button>
    );
  }
}

export default TrackButton;
