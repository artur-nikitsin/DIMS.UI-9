import React from 'react';
import './buttons.css';

class StatusButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='statusButtonsGroup'>
        <button className='successStatusButton' id={this.props.userId}>
          Success
        </button>
        <button className='failStatusButton' id={this.props.userId}>
          Fail
        </button>
      </div>
    );
  }
}

export default StatusButtons;
