import React from 'react';
import './memberTasks.scss';
import { getUserTaskList } from '../../firebase/api';
import Spinner from '../common/Spinner/Spinner';
import TrackButton from './Buttons/TrackButton';
import StatusButtons from './Buttons/StatusButtons';

class MemberTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTaskList: null,
    };
  }

  getUserTaskList = (user) => {
    if (user) {
      getUserTaskList(user).then((result) => {
        let tasks = result.map((task, i) => {
          return (
            <tr key={task.taskId} className={i % 2 ? 'darkLine' : 'whiteLine'}>
              <td>{i + 1}</td>
              <td>
                <a href=''>{task.name}</a>
              </td>
              <td>{new Date(task.startDate).toLocaleDateString()}</td>
              <td>{new Date(task.deadlineDate).toLocaleDateString()}</td>
              <td className={'tasksButtons'}>Status</td>
              <td className={'tasksButtons'}>
                <TrackButton />{' '}
              </td>
              <td className={'tasksButtons'}>
                <StatusButtons />
              </td>
            </tr>
          );
        });

        if (this.state.userTaskList === null) {
          this.setState({
            loading: false,
            userTaskList: tasks,
          });
        }
      });
    }
  };

  createMemberTaskTable = () => {
    const tableHeaders = (
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Start</th>
          <th>Deadline</th>
          <th>Status</th>
          <th />
          <th />
        </tr>
      </thead>
    );

    return (
      <div>
        <div>
          <p className={'userGreeting'}>{'Hi, dear ' + this.props.userName + '! This is your current tasks:'}</p>
        </div>
        <button className={'returnToFullListButton'} onClick={this.props.handleReturnToFullList}>
          Return back to full list
        </button>
        <table className={'memberTasksTable'}>
          {tableHeaders}
          <tbody>{this.state.userTaskList}</tbody>
        </table>
      </div>
    );
  };

  render() {
    this.getUserTaskList(this.props.userId);

    return (
      <div className={'memberTasksTableContainer'}>
        {this.state.loading ? <Spinner /> : this.createMemberTaskTable()}
      </div>
    );
  }
}

export default MemberTasks;
