import React from 'react';
import './buttons.css';

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={'membersButtonsGroup'}>
        <button className={'progressMemberButton'} id={this.props.userId} onClick={this.props.handleProgress}>
          Progress
        </button>
        <button className={'tasksMemberButton'} id={this.props.userId} onClick={this.props.handleTasks}>
          Tasks
        </button>
        <button className={'editMemberButton'} id={this.props.userId} onClick={this.props.handleEdit}>
          Edit
        </button>
        <button className={'deleteMemberButton'} id={this.props.userId} onClick={this.props.handleDelete}>
          Delete
        </button>
      </div>
    );
  }
}

export default Buttons;
