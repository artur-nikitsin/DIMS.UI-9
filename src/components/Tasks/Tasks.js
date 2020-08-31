import React from 'react';
import './tasks.css';
import api from '../../firebase/api';
import Spinner from '../common/Spinner/Spinner';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tasks: null,
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    api.getTasks().then((result) => {
      let tasks = result.map((task, i) => {
        return (
          <tr key={task.taskId + 'z'} className={i % 2 ? 'darkLine' : 'whiteLine'}>
            <td key={task.taskId + 'a'}>{i + 1}</td>
            <td key={task.taskId + 'b'}>
              <a href=''>{task.name}</a>
            </td>
            <td key={task.taskId + 'i'}>{new Date(task.startDate).toLocaleDateString()}</td>
            <td key={task.taskId + 'j'}>{new Date(task.deadlineDate).toLocaleDateString()}</td>
            <td key={task.taskId + 'h'} className={'memberButtons'}>
              {/*<Buttons
                userId={member.userId}
                handleProgress={() => this.handleProgress(member.userId, member.firstName)}
                handleTasks={() => this.handleTasks(member.userId, member.firstName)}
                handleEdit={() => this.handleEdit(member.userId)}
                handleDelete={() => this.handleDelete(member.userId)}
              />*/}
            </td>
          </tr>
        );
      });

      if (this.state.tasks === null) {
        this.setState({
          loading: false,
          tasks: tasks,
        });
      }
    });
  };

  createTasksTable = () => {
    const tableHeaders = (
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Start</th>
          <th>Deadline</th>
          <th />
        </tr>
      </thead>
    );

    return (
      <div>
        {/* <button className={'memberRegisterButton'}>Register</button>*/}
        <table className={'tasksTable'}>
          {tableHeaders}
          <tbody>{this.state.tasks}</tbody>
        </table>
      </div>
    );
  };

  render() {
    return <div className={'tasksTableContainer'}>{this.state.loading ? <Spinner /> : this.createTasksTable()}</div>;
  }
}

export default Tasks;
