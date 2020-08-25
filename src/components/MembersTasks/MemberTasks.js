import React from 'react';
import './memberTasks.css';
import api from '../../firebase/api';
import Buttons from '../Members/Buttons/Buttons';
import Spinner from '../common/Spinner/Spinner';

class MemberTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTaskList: null,
    };
  }

  getUserTaskList = (user) => {
    api.getUserTaskList(user).then((result) => {
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
            <td className={'tasksButtons'}>Button</td>
            <td className={'tasksButtons'}>Button</td>
          </tr>
        );
      });

      this.setState({
        loading: false,
        userTaskList: tasks,
      });
    });
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
      <div className={'memberTasksTableContainer'}>
        <button className={'returnToFullListButton'} onClick={this.props.handleReturnToFullList}>
          Return to full list
        </button>
        <table className={'memberTasksTable'}>
          {tableHeaders}
          <tbody>{this.state.userTaskList}</tbody>
        </table>
      </div>
    );
  };

  render() {
    this.getUserTaskList(this.props.user);
    /* console.log(this.state.userTaskList);*/

    return <div>{this.state.loading ? <Spinner /> : this.createMemberTaskTable()}</div>;
  }
}

export default MemberTasks;
