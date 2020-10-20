import React from "react";
import "./memberTasks.scss";
import { getTaskTrack, getUserTaskList } from "../../firebase/apiGet";
import Preloader from "../common/Preloader/Preloader";
import StatusButtons from "./Buttons/StatusButtons";
import { RoleContext } from "../../contexts/RoleContext";
import { Table, Button } from "reactstrap";
import { NavLink, Route, Switch } from "react-router-dom";
import MemberTracks from "../MemberTracks/MemberTracks";
import PropTypes from "prop-types";
import TaskModal from "../Modals/Task/TaskModal";
import isAdminOrMentor from "../common/Conditions/isAdminOrMentor";
import { ThemeContext } from "../../contexts/ThemeContext";
import Tasks from "../Tasks/Tasks";


class MemberTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTaskList: null,
      userTaskId: null,
      currentTaskName: null,
      modalIsOpen: false,
      modalType: null
    };
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    this.getUserTaskList(userId);
  }

  setCurrentTask = (userTaskId, name) => () => {
    this.setState({
      userTaskId,
      currentTaskName: name
    });
  };

  getUserTaskList = (user) => {

    if (user) {

      getUserTaskList(user).then((result) => {
        const { userId } = this.props.match.params;
        const { role } = this.props;
        const { theme } = this.context;

        let userTaskList = result.map((task, i) => {

          return (
            <tr key={task.taskId}>
              <td>{i + 1}</td>
              <td>
                <a href='' onClick={event => {
                  event.preventDefault();
                  this.openModal(task.taskId, "view")();
                }}>{task.name}</a>
              </td>
              <td>{new Date(task.startDate).toLocaleDateString()}</td>
              <td>{new Date(task.deadlineDate).toLocaleDateString()}</td>
              <td>{task.status}</td>

              {
                isAdminOrMentor(role) ?
                  <td className={"tasksButtons"}>
                    <StatusButtons stateId={task.stateId} />
                  </td>
                  :
                  <td className={"tasksButtons"}>
                    <NavLink to={`/app/members/tasks_user=${userId}/taskId=${task.userTaskId}`}>
                      <Button outline color={theme === "dark" ? "secondary" : "primary"}
                              onClick={this.setCurrentTask(task.userTaskId, task.name)}>
                        Track
                      </Button>
                    </NavLink>
                  </td>
              }
            </tr>
          );
        });

        if (!this.state.userTaskList) {
          this.setState({
            loading: false,
            userTaskList
          });
        }
      });
    }
  };

  openModal = (activeTaskId, modalType) => () => {
    this.setState({
      modalIsOpen: true,
      activeTaskId,
      modalType: modalType
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      activeTaskId: null
    });
  };


  createMemberTaskTable = () => {
    const { theme } = this.context;
    const { role } = this.props;

    const tableHeaders = (
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Start</th>
        <th>Deadline</th>
        <th>Status</th>
        <th />
      </tr>
      </thead>
    );

    const { modalIsOpen, activeTaskId, modalType } = this.state;
    return (
      <div className={"memberTasksTableContainer"}>

        {role === "user" ? <div>
          <p
            className={"userGreeting"}>{"Hi, dear " + this.props.signedUserName + "! This is your current tasks:"}</p>
        </div> : <NavLink to={`/app/members`}>
          Return to members manage grid
        </NavLink>}

        <TaskModal className={`${theme} taskModal`}
                   buttonLabel="TaskModal"
                   isOpen={modalIsOpen}
                   closeModal={this.closeModal}
                   taskId={activeTaskId}
                   modalType={modalType}
        />

        <Table striped className={`${theme} memberTasksTable`}>
          {tableHeaders}
          <tbody>{this.state.userTaskList}</tbody>
        </Table>
      </div>
    );
  };

  render() {
    const { userId } = this.props.match.params;
    const { userTaskId, currentTaskName, loading } = this.state;
    console.log(this.props);
    return (
      <div>
        <Switch>
          <Route exact path={`/app/members/tasks_user=${userId}`}>
            {loading ? <Preloader /> : this.createMemberTaskTable()}
          </Route>

          <Route path={`/app/members/tasks_user=${userId}/taskId=:userTaskId`}
                 render={(props) => <MemberTracks
                   userId={userId}
                   userTaskId={userTaskId}
                   taskName={currentTaskName}
                   userName={this.props.signedUserName}
                   {...props} />}>

          </Route>
        </Switch>
      </div>
    );

  }
}

MemberTasks.propTypes = {
  match: PropTypes.object.isRequired,
  userName: PropTypes.string
};

MemberTasks.contextType = ThemeContext;
export default MemberTasks;
