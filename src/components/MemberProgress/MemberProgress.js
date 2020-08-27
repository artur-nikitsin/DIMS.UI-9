import React from 'react';
import './memberProgress.css';
import api from '../../firebase/api';
import Spinner from '../common/Spinner/Spinner';

class MemberProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTrackList: null,
    };
  }

  getUserTrackList = (user) => {
    if (user) {
      api.getUserTrackList(user).then((result) => {
        let tracks = result.map((track, i) => {
          return (
            <tr key={track.taskTrackId} className={i % 2 ? 'darkLine' : 'whiteLine'}>
              <td>{i + 1}</td>
              <td>
                <a href=''>{track.name}</a>
              </td>
              <td>{track.trackNote}</td>
              <td>{new Date(track.trackDate).toLocaleDateString()}</td>
            </tr>
          );
        });

        if (this.state.userTrackList === null) {
          this.setState({
            loading: false,
            userTrackList: tracks,
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
        <button className={'returnToFullListButton'} onClick={this.props.handleReturnToFullList}>
          Return to full list
        </button>
        <table className={'membersTable'}>
          {tableHeaders}
          <tbody>{this.state.userTrackList}</tbody>
        </table>
      </div>
    );
  };

  render() {
    this.getUserTrackList(this.props.userId);
    return <div>{this.state.loading ? <Spinner /> : this.createMemberProgressTable()}</div>;
  }
}

export default MemberProgress;
