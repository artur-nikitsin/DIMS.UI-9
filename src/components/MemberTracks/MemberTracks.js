import React from "react";
import "./memberTracks.scss";
import { getTaskTrack, getUserTrackList } from "../../firebase/apiGet";
import Preloader from "../common/Preloader/Preloader";
import EditDeleteButtons from "../common/Buttons/EditDeleteButtons/EditDeleteButtons";
import getSubString from "../helpers/getSubString/getSubString";
import getLocalDate from "../helpers/getLocaleDate/getLocalDate";
import TableTrackHeaders from "./TableHeaders";
import { Button, Table } from "reactstrap";

class MemberTracks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTrackList: null
    };
  }

  componentDidMount() {
    this.getUserTrackList(this.props.taskId);
  }


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
              <td><EditDeleteButtons /></td>
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

  createMemberProgressTable = () => {
    const { navigationButtons, userName } = this.props;
    const { userTrackList } = this.state;
    return (
      <div className='memberTracksTableContainer'>
        {navigationButtons()}
        <div>
          <p className="userGreeting">{`Hi, dear ${userName}! This is your task tracks:`}</p>
        </div>
        <Button outline color="primary" className='trackCreateButton'>
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
          this.createMemberProgressTable()}
      </div>
    );
  }
}

export default MemberTracks;
