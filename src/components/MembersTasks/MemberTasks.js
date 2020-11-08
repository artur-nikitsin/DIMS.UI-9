import React from 'react';
import './memberTasks.scss';
import { Table, Button } from 'reactstrap';
import { NavLink, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserTaskList } from '../../firebase/apiGet';
import Preloader from '../common/Preloader/Preloader';
import StatusButtons from './Buttons/StatusButtons';
import MemberTracks from '../MemberTracks/MemberTracks';
import TaskModal from '../Modals/Task/TaskModal';
import isAdminOrMentor from '../common/Conditions/isAdminOrMentor';
import { ThemeContext } from '../../contexts/ThemeContext';
import NoDataMessage from '../common/Messages/NoDataMessage/NoDataMessage';
import getLocaleDate from '../helpers/getLocaleDate/getLocalDate';
import NavButton from '../common/Buttons/NavButton/NavButton';
import getThemeColor from '../helpers/getThemeColor/getThemeColor';

class MemberTasks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userId: null,
      userTaskList: [],
      modalIsOpen: false,
      modalType: null,
    };
    this.loadMemberTaskPage = this.loadMemberTaskPage.bind(this);
  }

  componentDidMount() {
    this.loadMemberTaskPage();
  }

  loadMemberTaskPage() {
    const { userId } = this.props.match.params;
    this.setState({
      loading: true,
      userTaskList: [],
    });
    this.getUserTaskList(userId);
  }

  getUserTaskList = (user) => {
    if (user) {
      getUserTaskList(user).then((result) => {
        const { role } = this.props;
        const { theme } = this.context;

        const userTaskList = result.map((task, i) => {
          return (
            <tr key={task.taskId}>
              <td>{i + 1}</td>
              <td>
                <Button
                  color='link'
                  onClick={(event) => {
                    event.preventDefault();
                    this.openModal(task.taskId, 'view')();
                  }}
                >
                  {task.name}
                </Button>
              </td>
              <td className='collapsed'>{getLocaleDate(task.startDate)}</td>
              <td className='collapsed'>{getLocaleDate(task.deadlineDate)}</td>
              {isAdminOrMentor(role) && <td className={`collapsed  ${task.status}`}>{task.status}</td>}

              <td className='minRow'>
                <ul className='tableInfo'>
                  <li>{`Start date: ${getLocaleDate(task.startDate)}`}</li>
                  <hr />
                  <li>{`Start date: ${getLocaleDate(task.deadlineDate)}`}</li>

                  {isAdminOrMentor(role) && (
                    <>
                      <hr />
                      <li className={task.status}>{`Status: ${task.status}`}</li>
                    </>
                  )}
                </ul>
              </td>
              {isAdminOrMentor(role) ? (
                <td className='tasksButtons'>
                  <StatusButtons stateId={task.stateId} loadMemberTaskPage={this.loadMemberTaskPage} />
                </td>
              ) : (
                <td className='tasksButtons'>
                  <NavButton
                    label='Track'
                    to={`/users/${user}/tasks/${task.userTaskId}/track`}
                    color={getThemeColor(theme)}
                  />
                </td>
              )}
            </tr>
          );
        });

        if (!this.state.userTaskList.length) {
          this.setState({
            loading: false,
            userTaskList,
          });
        }
      });
    }
  };

  openModal = (activeTaskId, modalType) => () => {
    this.setState({
      modalIsOpen: true,
      activeTaskId,
      modalType,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      activeTaskId: null,
    });
  };

  createMemberTaskTable = () => {
    const { theme } = this.context;
    const { role, signedUserName } = this.props;

    const tableHeaders = (
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th className='collapsed'>Start</th>
          <th className='collapsed'>Deadline</th>
          {isAdminOrMentor(role) && <th className='collapsed'>Status</th>}
          <th className='minRow'> Information</th>
          <th />
        </tr>
      </thead>
    );

    const { userTaskList, modalIsOpen, activeTaskId, modalType } = this.state;

    if (userTaskList.length) {
      return (
        <div className='memberTasksTableContainer'>
          {role === 'user' ? (
            <p className={`userGreeting ${theme}`}>{`Hi, dear ${signedUserName}! This is your current tasks:`}</p>
          ) : (
            <NavLink to='/users'> Return to members manage grid</NavLink>
          )}

          <TaskModal
            className={`${theme} taskModal`}
            buttonLabel='TaskModal'
            isOpen={modalIsOpen}
            closeModal={this.closeModal}
            taskId={activeTaskId}
            modalType={modalType}
          />

          <Table striped className={`${theme} memberTasksTable`}>
            {tableHeaders}
            <tbody>{userTaskList}</tbody>
          </Table>
        </div>
      );
    }
    if (role === 'user') {
      return <NoDataMessage text='You have no tasks yet, please contact your mentor' />;
    }
    return (
      <NoDataMessage
        text='Nothing to show =('
        linkTo='/users'
        linkText='Return to members
      manage grid'
      />
    );
  };

  render() {
    const { userId } = this.props.match.params;
    const { currentTaskName, userTaskId, loading } = this.state;
    return (
      <div>
        <Switch>
          <Route exact path={`/users/${userId}/tasks`}>
            {loading ? <Preloader /> : this.createMemberTaskTable()}
          </Route>

          <Route
            path={`/users/${userId}/tasks/:userTaskId/track`}
            render={(props) => (
              <MemberTracks
                userId={userId}
                userTaskId={userTaskId}
                taskName={currentTaskName}
                userName={this.props.signedUserName}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

MemberTasks.propTypes = {
  userName: PropTypes.string,
  signedUserName: PropTypes.string,
};

MemberTasks.defaultProps = {
  userName: '',
  signedUserName: '',
};
MemberTasks.contextType = ThemeContext;
export default MemberTasks;
