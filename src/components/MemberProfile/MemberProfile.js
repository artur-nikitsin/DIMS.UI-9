import React from 'react';
import MemberTasks from '../MembersTasks/MemberTasks';
import MemberTracks from '../MemberTracks/MemberTracks';
import './membersProfile.scss';

class MemberProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'tasks',
    };
  }

  handleShowActivePage = (page) => () => {
    this.setState({
      activePage: page,
    });
  };

  showActivePage = (page) => {
    switch (page) {
      case 'tasks':
        return (
          <MemberTasks
            userId={this.props.userId}
            userName={this.props.userName}
            navigationButtons={this.navigationButtons}
            handleReturnToFullList={this.props.handleReturnToFullList}
          />
        );
      case 'taskTrack':
        return (
          <MemberTracks
            userId={this.props.userId}
            userName={this.props.userName}
            navigationButtons={this.navigationButtons}
            handleReturnToFullList={this.props.handleReturnToFullList}
          />
        );
    }
  };

  navigationButtons = () => {
    return (
      <div>
        <button
          onClick={this.handleShowActivePage('tasks')}
          className={this.state.activePage === 'tasks' ? 'activeTasksButton' : 'tasksButton'}
        >
          Tasks
        </button>
        <button
          onClick={this.handleShowActivePage('taskTrack')}
          className={this.state.activePage === 'taskTrack' ? 'activeTracksButton' : 'tracksButton'}
        >
          Task tracks
        </button>
      </div>
    );
  };

  render() {
    return <div className='memberProfile'>{this.showActivePage(this.state.activePage)}</div>;
  }
}

export default MemberProfile;
