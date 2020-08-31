import React from 'react';
import MemberTasks from '../MembersTasks/MemberTasks';
import MemberTracks from '../MemberTracks/MemberTracks';
import Tasks from '../Tasks/Tasks';

class MemberProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'tasks',
    };
  }

  handleShowActivePage = (page) => {
    this.setState({
      activePage: page,
    });
  };

  showActivePage = (page) => {
    switch (page) {
      case 'tasks':
        return <MemberTasks userId={this.props.userId} userName={this.props.userName} />;
      case 'taskTrack':
        return <MemberTracks userId={this.props.userId} userName={this.props.userName} />;
    }
  };

  render() {
    return (
      <div>
        <button onClick={() => this.handleShowActivePage('tasks')}>Tasks</button>
        <button onClick={() => this.handleShowActivePage('taskTrack')}>Task tracks</button>
        {this.showActivePage(this.state.activePage)}
      </div>
    );
  }
}

export default MemberProfile;
