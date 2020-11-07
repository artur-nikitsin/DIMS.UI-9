import React from 'react';
import './memberProgress.scss';
import { NavLink } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import Preloader from '../common/Preloader/Preloader';
import { getUserTrackList } from '../../firebase/apiGet';
import getSubString from '../helpers/getSubString/getSubString';
import getLocaleDate from '../helpers/getLocaleDate/getLocalDate';
import { ThemeContext } from '../../contexts/ThemeContext';
import NoDataMessage from '../common/Messages/NoDataMessage/NoDataMessage';

class MemberProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userTrackList: null,
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
        const userTrackList = allTaskWithSubtask.map((track, i) => {
          return (
            <tr key={track.taskTrackId}>
              <td>{i + 1}</td>
              <td>
                <Button color='link'>{track.name}</Button>
              </td>
              <td className='collapsed'>{track.trackNote}</td>
              <td className='collapsed'>{getLocaleDate(track.trackDate)}</td>
              <td className='minRow'>
                <ul className='tableInfo'>
                  <li>{`Note: ${getSubString(track.trackNote, 50)}`}</li>
                  <hr />
                  <li>{`Date: ${getLocaleDate(track.trackDate)}`}</li>
                </ul>
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

  createMemberProgressTable = () => {
    const tableHeaders = (
      <thead>
        <tr>
          <th>#</th>
          <th>Task</th>
          <th className='collapsed'>Note</th>
          <th className='collapsed'>Date</th>
          <th className='minRow'> Information</th>
        </tr>
      </thead>
    );

    const { userTrackList } = this.state;
    const { theme } = this.context;

    if (userTrackList.length) {
      return (
        <div className='progressTableContainer'>
          <NavLink to='/users'>Return to members manage grid</NavLink>
          <Table striped className={`${theme} progressTable`}>
            {tableHeaders}
            <tbody>{userTrackList}</tbody>
          </Table>
        </div>
      );
    }
    return <NoDataMessage />;
  };

  render() {
    const { loading } = this.state;
    return <div>{loading ? <Preloader /> : this.createMemberProgressTable()}</div>;
  }
}

MemberProgress.contextType = ThemeContext;
export default MemberProgress;
