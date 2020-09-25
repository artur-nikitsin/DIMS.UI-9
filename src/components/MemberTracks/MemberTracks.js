import React from "react";
import "./memberTracks.scss";
import { getUserTrackList } from "../../firebase/apiGet";
import Preloader from "../common/Preloader/Preloader";
import EditDeleteButtons from "../common/Buttons/EditDeleteButtons/EditDeleteButtons";
import getSubString from "../helpers/getSubString/getSubString";
import getLocalDate from "../helpers/getLocaleDate/getLocalDate";


class MemberTracks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTrackList: null
    };
  }

  componentDidMount() {
    this.getUserTrackList(this.props.userId);
  }


  getUserTrackList = (user) => {
    if (user) {
      getUserTrackList(user).then((result) => {
        let tracks = result.map((track, i) => {
          return (
            <tr key={track.taskTrackId} className={i % 2 ? "darkLine" : "whiteLine"}>
              <td>{i + 1}</td>
              <td>{track.name}</td>
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
    const tableHeaders = (
      <thead>
      <tr>
        <th>#</th>
        <th>Task</th>
        <th>Note</th>
        <th>Date</th>
        <th />
      </tr>
      </thead>
    );

    return (
      <div className='memberTracksTableContainer'>
        <button className='returnToFullListButton' onClick={this.props.handleReturnToFullList}>
          Return to full list
        </button>
        <div>
          <p className="userGreeting">{`Hi, dear '${this.props.userName}! This is your task tracks:`}</p>
        </div>
        <button className='trackCreateButton'>
          Create
        </button>
        <table className='tracksTable'>
          {tableHeaders}
          <tbody>{this.state.userTrackList}</tbody>
        </table>
      </div>
    );
  };

  render() {
    return <div>{this.state.loading ? <Preloader /> : this.createMemberProgressTable()}</div>;
  }
}

export default MemberTracks;
