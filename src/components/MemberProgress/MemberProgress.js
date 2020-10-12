import React from "react";
import "./memberProgress.scss";
import { getTaskTrack, getUserTrackList } from "../../firebase/apiGet";
import Preloader from "../common/Preloader/Preloader";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";


class MemberProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTrackList: null
    };
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    this.getUserTrackList(userId);
  }

  getUserTrackList = (user) => {
    if (user) {
      getUserTrackList(user).then((result) => {
        const allTaskWithSubtask = result.flat();

        let tracks = allTaskWithSubtask.map((track, i) => {
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


    const { userTrackList } = this.state;
    return (
      <div>
        <NavLink to={`/app/members`}>
          Return to members manage grid
        </NavLink>
        <table className='progressTable'>
          {tableHeaders}
          <tbody>{userTrackList}</tbody>
        </table>
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <div>{loading ? <Preloader />
        :
        this.createMemberProgressTable()}
      </div>
    );
  }
}

MemberProgress.propTypes = {
  match: PropTypes.object.isRequired
};

export default MemberProgress;
