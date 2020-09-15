import React from 'react';
import './memberTracks.scss';
import { getUserTrackList } from '../../firebase/apiGet';
import Spinner from '../common/Spinner/Spinner';
import EditDeleteButtons from '../common/Buttons/EditDeleteButtons/EditDeleteButtons';

class MemberTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTrackList: null,
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
            <tr key={track.taskTrackId} className={i % 2 ? 'darkLine' : 'whiteLine'}>
              <td>{i + 1}</td>
              <td>
                <a href=''>{track.name}</a>
              </td>
              <td>
                {' '}
                <a href=''>{track.trackNote.substr(0, 50) + '...'}</a>
              </td>
              <td>{new Date(track.trackDate).toLocaleDateString()}</td>
              <td>
                <EditDeleteButtons />
              </td>
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
          <th />
        </tr>
      </thead>
    );

    return (
      <div className='memberTracksTableContainer'>
        <button className='returnToFullListButton' onClick={this.props.handleReturnToFullList}>
          Return to full list
        </button>
        {this.props.navigationButtons()}
        <div>
          <p className={'userGreeting'}>{'Hi, dear ' + this.props.userName + '! This is your task tracks:'}</p>
        </div>
        <table className='tracksTable'>
          {tableHeaders}
          <tbody>{this.state.userTrackList}</tbody>
        </table>
      </div>
    );
  };

  render() {
    return <div>{this.state.loading ? <Spinner /> : this.createMemberProgressTable()}</div>;
  }
}

export default MemberTracks;
