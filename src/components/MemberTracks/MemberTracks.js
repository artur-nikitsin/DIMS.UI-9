import React from 'react';
import './memberTracks.scss';
import { Button, Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getTaskTrack } from '../../firebase/apiGet';
import Preloader from '../common/Preloader/Preloader';
import EditDeleteButtons from '../common/Buttons/EditDeleteButtons/EditDeleteButtons';
import getSubString from '../helpers/getSubString/getSubString';
import getLocalDate from '../helpers/getLocaleDate/getLocalDate';
import TableTrackHeaders from './TableHeaders';
import TrackModal from '../Modals/Track/TrackModal';
import { deleteTask } from '../../firebase/apiDelete';
import { ThemeContext } from '../../contexts/ThemeContext';
import changeReactstrapColor from '../helpers/changeReactstrapColor/changeReactstrapColor';

class MemberTracks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTrackList: null,
      modalIsOpen: false,
      activeTrackId: null,
      userTaskId: null,
      modalType: null,
    };
  }

  componentDidMount() {
    const { userTaskId } = this.props.match.params;
    this.getUserTrackList(userTaskId);
  }

  handleDelete = (trackId) => () => {
    deleteTask(trackId).then(() => {
      this.reloadTrackPage();
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
              <td>{this.props.taskName}</td>
              <td>{getSubString(track.trackNote, 50)}</td>
              <td>{getLocalDate(track.trackDate)}</td>
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
      modalType: null,
    });
  };

  closeModalAndReload = () => {
    this.closeModal();
    this.reloadTrackPage();
  };

  createMemberTrackTable = () => {
    const { userName, taskName, userTaskId, userId } = this.props;
    const { userTrackList, modalIsOpen, activeTrackId, modalType } = this.state;
    const { theme } = this.context;
    return (
      <div className='memberTracksTableContainer'>
        <NavLink to={`/users/${userId}/tasks`}>Return to task list</NavLink>
        <div>
          <p className='userGreeting'>{`Hi, dear ${userName}! This is your task tracks:`}</p>
        </div>

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
          color={changeReactstrapColor(theme)}
          className='trackCreateButton'
          onClick={this.openModal(null, null, 'register')}
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
