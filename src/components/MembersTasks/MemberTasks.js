import React from "react";
import "./memberTasks.scss";
import { getTaskTrack, getUserTaskList } from "../../firebase/apiGet";
import Preloader from "../common/Preloader/Preloader";
import TrackButton from "./Buttons/TrackButton";
import StatusButtons from "./Buttons/StatusButtons";
import { RoleContext } from "../../RoleContext";
import MembersPage from "../MembersPage/MembersPage";
import { Table, Button } from "reactstrap";
import { NavLink, Redirect, Route } from "react-router-dom";
import MemberTracks from "../MemberTracks/MemberTracks";

class MemberTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTaskList: null,
      userTaskId: null,
      currentTaskName: null
    };
  }

  componentDidMount() {
    this.getUserTaskList(this.props.userId);
  }

  setCurrentTask = (userTaskId, name) => () => {
    this.setState({
      userTaskId: userTaskId,
      currentTaskName: name
    });
    console.log(this.state);
  };

  getUserTaskList = (user) => {
    if (user) {
      getUserTaskList(user).then((result) => {
        const { userId } = this.props;
        const { role } = this.context;
        let tasks = result.map((task, i) => {
          return (
            <tr key={task.taskId} className={i % 2 ? "darkLine" : "whiteLine"}>
              <td>{i + 1}</td>
              <td>
                <a href=''>{task.name}</a>
              </td>
              <td>{new Date(task.startDate).toLocaleDateString()}</td>
              <td>{new Date(task.deadlineDate).toLocaleDateString()}</td>
              <td className={"tasksButtons"}>Status</td>

              {(role === "admin" || role === "mentor") ||
              <td className={"tasksButtons"}>
                <NavLink to={`/app/members/tasks_user=${userId}/taskId=${task.userTaskId}`}>
                  <Button outline color="primary"
                          onClick={this.setCurrentTask(task.userTaskId, task.name)}>
                    Track
                  </Button>
                </NavLink>
              </td>}

              <td className={"tasksButtons"}>
                <StatusButtons />
              </td>
            </tr>
          );
        });

        if (this.state.userTaskList === null) {
          this.setState({
            loading: false,
            userTaskList: tasks
          });
        }
      });
    }
  };


  createMemberTaskTable = () => {
    const { role } = this.context;
    const tableHeaders = (
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Start</th>
        <th>Deadline</th>
        <th>Status</th>
        <th />
        {(role === "admin" || role === "mentor") || <th />}
      </tr>
      </thead>
    );

    return (
      <div className={"memberTasksTableContainer"}>

        {role === "user" ? <div>
          <p className={"userGreeting"}>{"Hi, dear " + this.props.userName + "! This is your current tasks:"}</p>
        </div> : <NavLink to={`/app/members`}>
          Return to members manage grid
        </NavLink>}


        <Table striped className={"memberTasksTable"}>
          {tableHeaders}
          <tbody>{this.state.userTaskList}</tbody>
        </Table>
      </div>
    );
  };

  render() {
    const { userId } = this.props;
    const { userTaskId } = this.state;

    return (
      <div>
        <Route exact path={`/app/members/tasks_user=${userId}`}>
          {this.state.loading ? <Preloader /> : this.createMemberTaskTable()}
        </Route>

        <Route path={`/app/members/tasks_user=${userId}/taskId=${userTaskId}`}>
          <MemberTracks
            userId={userId}
            userTaskId={this.state.userTaskId}
            taskName={this.state.currentTaskName}
            userName={this.props.userName}
          />
        </Route>
      </div>
    );

  }
}

MemberTasks.contextType = RoleContext;
export default MemberTasks;
