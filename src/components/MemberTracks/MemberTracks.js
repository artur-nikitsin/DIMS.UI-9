import React from 'react';
import './memberTracks.scss';
import { Button, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { getTaskName, getTaskTrack } from '../../firebase/apiGet';
import Preloader from '../common/Preloader/Preloader';
import EditDeleteButtons from '../common/Buttons/EditDeleteButtons/EditDeleteButtons';
import getSubString from '../helpers/getSubString/getSubString';
import getLocalDate from '../helpers/getLocaleDate/getLocalDate';
import TableTrackHeaders from './TableHeaders';
import TrackModal from '../Modals/Track/TrackModal';
import { deleteTask } from '../../firebase/apiDelete';
import { ThemeContext } from '../../contexts/ThemeContext';
import getThemeColor from '../helpers/getThemeColor/getThemeColor';
import ReturnLink from '../common/ReturnLink/ReturnLink';

class MemberTracks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTrackList: null,
      modalIsOpen: false,
      activeTrackId: null,
      userTaskId: null,
      taskName: '',
      modalType: null,
    };
  }

  componentDidMount() {
    const { userTaskId } = this.props.match.params;
    this.getTaskName(userTaskId).then(() => {
      this.getUserTrackList(userTaskId);
    });
  }

  handleDelete = (trackId) => () => {
    deleteTask(trackId).then(() => {
      this.reloadTrackPage();
    });
  };

  getTaskName = async (userTaskId) => {
    await getTaskName(userTaskId).then((name) => {
      this.setState({
        taskName: name,
      });
    });
  };

  reloadTrackPage = () => {
    const { userTaskId } = this.props.match.params;
    this.setState({
      loading: true,
      userTrackList: null,
    });
    this.getUserTrackList(userTaskId);
  };

  getUserTrackList = (user) => {
    if (user) {
      getTaskTrack(user).then((result) => {
        const userTrackList = result.map((track, i) => {
          return (
            <tr key={track.taskTrackId}>
              <td>{i + 1}</td>
              <td>{this.state.taskName}</td>
              <td className='collapsed'>{getSubString(track.trackNote, 50)}</td>
              <td className='collapsed'>{getLocalDate(track.trackDate)}</td>
              <td className='minRow'>
                <ul className='tableInfo'>
                  <li>{`Track note: ${getSubString(track.trackNote, 50)}`}</li>
                  <hr />
                  <li>{`Track date: ${getLocalDate(track.trackDate)}`}</li>
                </ul>
              </td>
              <td>
                <EditDeleteButtons
                  handleEdit={this.openModal(track.taskTrackId)}
                  handleDelete={this.handleDelete(track.taskTrackId)}
                />
              </td>
            </tr>
          );
        });

        if (!this.state.userTrackList) {
          this.setState({
            loading: false,
            userTrackList,
          });
        }
      });
    }
  };

  openModal = (activeTrackId, userTaskId, modalType) => () => {
    this.setState({
      modalIsOpen: true,
      activeTrackId,
      userTaskId,
      modalType,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      activeTrackId: null,
      userTaskId: null,
    });
  };

  closeModalAndReload = () => {
    this.closeModal();
    this.reloadTrackPage();
  };

  createMemberTrackTable = () => {
    const { userName, userId } = this.props;
    const { userTrackList, modalIsOpen, activeTrackId, modalType, taskName } = this.state;
    const { userTaskId } = this.props.match.params;
    const { theme } = this.context;
    return (
      <div className='memberTracksTableContainer'>
        <ReturnLink to={`/users/${userId}/tasks`} text='Return to task list' />
        <p className={`userGreeting ${theme}`}>{`Hi, dear ${userName}! This is your task tracks:`}</p>

        <TrackModal
          className={`${theme} trackModal`}
          buttonLabel='TrackModal'
          isOpen={modalIsOpen}
          closeModal={this.closeModal}
          closeModalAndReload={this.closeModalAndReload}
          trackId={activeTrackId}
          taskName={taskName}
          userTaskId={userTaskId}
          modalType={modalType}
        />

        <Button
          outline
          color={getThemeColor(theme)}
          className='trackCreateButton'
          onClick={this.openModal(activeTrackId, userTaskId, 'register')}
        >
          Add
        </Button>
        <Table striped className={`${theme} tracksTable`}>
          <TableTrackHeaders />
          <tbody>{userTrackList}</tbody>
        </Table>
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    return <div>{loading ? <Preloader /> : this.createMemberTrackTable()}</div>;
  }
}

MemberTracks.propTypes = {
  userName: PropTypes.string,
  taskName: PropTypes.string,
  userTaskId: PropTypes.string,
  userId: PropTypes.string,
};

MemberTracks.defaultProps = {
  userName: '',
  taskName: '',
  userTaskId: '',
  userId: '',
};

MemberTracks.contextType = ThemeContext;
export default MemberTracks;
