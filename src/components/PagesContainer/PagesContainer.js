import React from 'react';
import MembersPage from '../Members/MembersPage';
import Tasks from '../Tasks/Tasks';
import '../common/Styles/commonTableStyles.scss';
import './pagesContainer.scss';

class PagesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'members',
    };
  }

  showActivePage = (page) => {
    switch (page) {
      case 'members':
        return <MembersPage />;
      case 'tasks':
        return <Tasks />;
    }
  };

  handleShowActivePage = (page) => {
    this.setState({
      activePage: page,
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={() => this.handleShowActivePage('members')}
          className={this.state.activePage === 'members' ? 'activeMembersButton' : 'membersButton'}
        >
          Members
        </button>
        <button
          onClick={() => this.handleShowActivePage('tasks')}
          className={this.state.activePage === 'tasks' ? 'activeTasksTabButton' : 'tasksTabButton'}
        >
          Tasks
        </button>
        <div className='pagesContainer'>{this.showActivePage(this.state.activePage)}</div>
      </div>
    );
  }
}

export default PagesContainer;
