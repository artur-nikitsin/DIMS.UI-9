import React from "react";
import "./tasks.scss";
import { getTasks } from "../../firebase/apiGet";
import Preloader from "../common/Preloader/Preloader";
import EditDeleteButtons from "../common/Buttons/EditDeleteButtons/EditDeleteButtons";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tasks: null
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    getTasks().then((result) => {
      let tasks = result.map((task, i) => {
        return (
          <tr key={task.taskId + "z"} className={i % 2 ? "darkLine" : "whiteLine"}>
            <td key={task.taskId + "a"}>{i + 1}</td>
            <td key={task.taskId + "b"}>
              <a href=''>{task.name}</a>
            </td>
            <td key={task.taskId + "i"}>{new Date(task.startDate).toLocaleDateString()}</td>
            <td key={task.taskId + "j"}>{new Date(task.deadlineDate).toLocaleDateString()}</td>
            <td key={task.taskId + "h"}>
              <EditDeleteButtons />
            </td>
          </tr>
        );
      });

      if (this.state.tasks === null) {
        this.setState({
          loading: false,
          tasks: tasks
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
        <table className='tasksTable'>
          {tableHeaders}
          <tbody>{this.state.tasks}</tbody>
        </table>
      </div>
    );
  };

  render() {
    return <div className='tasksTableContainer'>{this.state.loading ? <Preloader /> : this.createTasksTable()}</div>;
  }
}

export default Tasks;
