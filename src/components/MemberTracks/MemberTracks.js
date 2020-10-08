import React from "react";
import "./memberTracks.scss";
import { getTaskTrack, getUserTrackList } from "../../firebase/apiGet";
import Preloader from "../common/Preloader/Preloader";
import EditDeleteButtons from "../common/Buttons/EditDeleteButtons/EditDeleteButtons";
import getSubString from "../helpers/getSubString/getSubString";
import getLocalDate from "../helpers/getLocaleDate/getLocalDate";
import TableTrackHeaders from "./TableHeaders";
import { Button, Table } from "reactstrap";
import TrackModal from "../Modals/Track/TrackModal";
import TaskModal from "../Modals/Task/TaskModal";
import { deleteTask } from "../../firebase/apiDelete";

class MemberTracks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTrackList: null,
      modalIsOpen: false,
      activeTrackId: null,
      userTaskId: null
    };
  }

  componentDidMount() {
    this.getUserTrackList(this.props.userTaskId);
  }

  handleDelete = (trackId) => () => {
    deleteTask(trackId)
      .then(() => {
        this.reloadTrackPage();
      });
  };


  reloadTrackPage = () => {

    this.setState({
      loading: true,
      userTrackList: null
    });
    this.getUserTrackList(this.props.userTaskId);
  };

  getUserTrackList = (user) => {
    if (user) {
      getTaskTrack(user).then((result) => {
        let tracks = result.map((track, i) => {
          return (
            <tr key={track.taskTrackId} className={i % 2 ? "darkLine" : "whiteLine"}>
              <td>{i + 1}</td>
              <td>{this.props.taskName}</td>
              <td>{getSubString(track.trackNote, 50)}</td>
              <td>{getLocalDate(track.trackDate)}</td>
              <td><EditDeleteButtons handleEdit={this.openModal(track.taskTrackId)}
                                     handleDelete={this.handleDelete(track.taskTrackId)} /></td>
            </tr>
          );
        });

        if (!this.state.userTrackList) {
          this.setState({
            loading: false,
            userTrackList: tracks
          });
        }
      });
    }
  };

  openModal = (trackId, userTaskId) => () => {
    this.setState({
      modalIsOpen: true,
      activeTrackId: trackId,
      userTaskId: userTaskId
    });
  };

  closeModal = (trackId) => {
    this.setState({
      modalIsOpen: false,
      activeTrackId: trackId,
      userTaskId: null
    });
  };


  createMemberTrackTable = () => {

    const { navigationButtons, userName, taskName, userTaskId } = this.props;
    const { userTrackList, modalIsOpen, activeTrackId } = this.state;
    return (
      <div className='memberTracksTableContainer'>
        {navigationButtons()}
        <div>
          <p className="userGreeting">{`Hi, dear ${userName}! This is your task tracks:`}</p>
        </div>

        <TrackModal className="trackModal"
                    buttonLabel="TrackModal"
                    isOpen={modalIsOpen}
                    closeModal={this.closeModal}
                    trackId={activeTrackId}
                    taskName={taskName}
                    reloadTrackPage={this.reloadTrackPage}
                    userTaskId={userTaskId}
        />
        <Button outline color="primary" className='trackCreateButton' onClick={this.openModal(null)}>
          Add
        </Button>
        <Table striped className='tracksTable'>
          <TableTrackHeaders />
          <tbody>{userTrackList}</tbody>
        </Table>
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        {loading ? <Preloader />
          :
          this.createMemberTrackTable()}
      </div>
    );
  }
}

export default MemberTracks;
