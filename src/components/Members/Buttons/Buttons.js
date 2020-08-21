import React from 'react';
import './buttons.css';

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
    };
  }

  render() {
    return (
      <div className={'membersButtonsGroup'}>
        <button className={'progressMemberButton'}>Progress</button>
        <button className={'tasksMemberButton'}>Tasks</button>
        <button className={'editMemberButton'}>Edit</button>
        <button className={'deleteMemberButton'}>Delete</button>
      </div>
    );
  }
}

export default Buttons;
