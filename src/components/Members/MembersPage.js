import React from 'react';
import MemberProgress from '../MemberProgress/MemberProgress';
import MemberTasks from '../MembersTasks/MemberTasks';
import Buttons from './Buttons/Buttons';
import { getMembers } from '../../firebase/api';
import './members.scss';
import Spinner from '../common/Spinner/Spinner';

class MembersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      members: null,
      activePage: 'membersTable',
      activeUserId: null,
      activeUserName: null,
      memberProgressShow: null,
    };
  }

  componentDidMount() {
    this.getMembers();
  }

  handleProgress = (userId, name) => () => {
    this.setState({
      activePage: 'membersProgress',
      activeUserId: userId,
      activeUserName: name,
    });
  };

  handleTasks = (userId, name) => () => {
    this.setState({
      activePage: 'membersTasks',
      activeUserId: userId,
      activeUserName: name,
    });
  };

  handleEdit = (userId) => {};

  handleDelete = (userId) => {};

  handleReturnToFullList = () => {
    this.setState({
      activePage: 'membersTable',
      activeUserId: null,
    });
  };

  showActivePage = (page) => {
    switch (page) {
      case 'membersTable':
        return this.createMembersTable();

      case 'membersProgress':
        return (
          <div>
            <MemberProgress userId={this.state.activeUserId} handleReturnToFullList={this.handleReturnToFullList} />
          </div>
        );

      case 'membersTasks':
        return (
          <div>
            <MemberTasks
              userId={this.state.activeUserId}
              userName={this.state.activeUserName}
              handleReturnToFullList={this.handleReturnToFullList}
            />
          </div>
        );
    }
  };

  getMembers = () => {
    getMembers().then((result) => {
      let members = result.map((member, i) => {
        return (
          <tr key={member.userId + 'n'} className={i % 2 ? 'darkLine' : 'whiteLine'}>
            <td key={member.userId + 'a'}>{i + 1}</td>
            <td key={member.userId + 'b'}>
              <a href=''>{member.firstName + ' ' + member.lastName}</a>
            </td>
            <td key={member.userId + 'c'}>{member.directionId}</td>
            <td key={member.userId + 'd'}>{member.education}</td>
            <td key={member.userId + 'i'}>{new Date(member.startDate).toLocaleDateString()}</td>
            <td key={member.userId + 'j'}>{new Date(member.birthDate).toLocaleDateString()}</td>
            <td key={member.userId + 'h'} className='memberButtons'>
              <Buttons
                userId={member.userId}
                handleProgress={this.handleProgress(member.userId, member.firstName)}
                handleTasks={() => this.handleTasks(member.userId, member.firstName)}
                handleEdit={() => this.handleEdit(member.userId)}
                handleDelete={() => this.handleDelete(member.userId)}
              />
            </td>
          </tr>
        );
      });

      if (!this.state.members) {
        this.setState({
          loading: false,
          members: members,
        });
      }
    });
  };

  createMembersTable = () => {
    const tableHeaders = (
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Direction</th>
          <th>Education</th>
          <th>Start</th>
          <th>Age</th>
          <th />
        </tr>
      </thead>
    );

    return (
      <div>
        <button className='memberRegisterButton'>Register</button>
        <table className='membersTable'>
          {tableHeaders}
          <tbody>{this.state.members}</tbody>
        </table>
      </div>
    );
  };

  render() {
    return (
      <div className='membersTableContainer'>
        {this.state.loading ? <Spinner /> : this.showActivePage(this.state.activePage)}
      </div>
    );
  }
}

export default MembersPage;
