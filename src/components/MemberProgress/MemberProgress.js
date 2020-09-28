import React from "react";
import "./memberProgress.scss";
import { getUserTrackList } from "../../firebase/apiGet";
import Preloader from "../common/Preloader/Preloader";

class MemberProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTrackList: null
    };
  }

  componentDidMount() {
    const { userId } = this.props.userId;
    this.getUserTrackList(userId);
  }

  getUserTrackList = (user) => {
    if (user) {
      getUserTrackList(user).then((result) => {
        let tracks = result.map((track, i) => {
          return (
            <tr key={track.taskTrackId} className={i % 2 ? "darkLine" : "whiteLine"}>
              <td>{i + 1}</td>
              <td>
                <a href=''>{track.name}</a>
              </td>
              <td>
                <a href=''>{track.trackNote.substr(0, 50) + "..."}</a>
              </td>
              <td>{new Date(track.trackDate).toLocaleDateString()}</td>
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
      </tr>
      </thead>
    );

    return (
      <div>
        <button className='returnToFullListButton' onClick={this.props.handleReturnToFullList}>
          Return to full list
        </button>
        <table className='progressTable'>
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

export default MemberProgress;
