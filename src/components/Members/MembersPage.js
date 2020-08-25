import React from 'react';
import MemberProgress from '../MemberProgress/MemberProgress';
import MemberTasks from '../MembersTasks/MemberTasks';
import Buttons from './Buttons/Buttons';
import api from '../../firebase/api';
import './members.css';
import FakerDB from '../../faker/FakerDB';
import Spinner from '../common/Spinner/Spinner';

class MembersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      members: null,
      activePage: 'membersTable',
      activeUser: null,
      memberProgressShow: null,
    };
  }

  handleProgress = (userId) => {
    this.setState({
      activePage: 'membersProgress',
      activeUser: userId,
    });
    console.log(userId + ' progress');
  };

  handleTasks = (userId) => {
    this.setState({
      activePage: 'membersTasks',
      activeUser: userId,
    });
  };

  handleEdit = (userId) => {
    console.log(userId + ' edit');
  };

  handleDelete = (userId) => {
    console.log(userId + ' delete');
  };

  handleReturnToFullList = () => {
    this.setState({
      activePage: 'membersTable',
      activeUser: null,
    });
  };

  showActivePage = (page) => {
    switch (page) {
      case 'membersTable':
        return this.createMembersTable();

      case 'membersProgress':
        return (
          <div>
            <MemberProgress user={this.state.activeUser} handleReturnToFullList={() => this.handleReturnToFullList()} />
          </div>
        );

      case 'membersTasks':
        return (
          <div>
            <MemberTasks user={this.state.activeUser} handleReturnToFullList={() => this.handleReturnToFullList()} />
          </div>
        );
    }
  };

  getMembers = () => {
    api.getMembers().then((result) => {
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
            <td key={member.userId + 'h'} className={'memberButtons'}>
              <Buttons
                userId={member.userId}
                handleProgress={() => this.handleProgress(member.userId)}
                handleTasks={() => this.handleTasks(member.userId)}
                handleEdit={() => this.handleEdit(member.userId)}
                handleDelete={() => this.handleDelete(member.userId)}
              />
            </td>
          </tr>
        );
      });

      if (this.state.members === null) {
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
      <table className={'membersTable'}>
        {tableHeaders}
        <tbody>{this.state.members}</tbody>
      </table>
    );
  };

  render() {
    FakerDB.create(5);
    this.getMembers();

    return (
      <div>
        <div className={'membersTableContainer'}>
          {this.state.loading ? <Spinner /> : this.showActivePage(this.state.activePage)}
        </div>
      </div>
    );
  }
}

export default MembersPage;
