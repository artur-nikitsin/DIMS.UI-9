import React from 'react';
import './memberProgress.scss';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';
import Preloader from '../common/Preloader/Preloader';
import { getUserTrackList } from '../../firebase/apiGet';
import getSubString from '../helpers/getSubString/getSubString';
import getLocaleDate from '../helpers/getLocaleDate/getLocalDate';
import { ThemeContext } from '../../contexts/ThemeContext';

class MemberProgress extends React.Component {
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
              <td>
                <Button color='link'>{getSubString(track.trackNote, 50)}</Button>
              </td>
              <td>{getLocaleDate(track.trackDate)}</td>
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
          <th>Note</th>
          <th>Date</th>
        </tr>
      </thead>
    );

    const { userTrackList } = this.state;
    const { theme } = this.context;
    return (
      <div>
        <NavLink to='/members'>Return to members manage grid</NavLink>
        <Table striped className={`${theme} progressTable`}>
          {tableHeaders}
          <tbody>{userTrackList}</tbody>
        </Table>
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    return <div>{loading ? <Preloader /> : this.createMemberProgressTable()}</div>;
  }
}

MemberProgress.propTypes = {
  match: PropTypes.object.isRequired,
};

MemberProgress.contextType = ThemeContext;
export default MemberProgress;
