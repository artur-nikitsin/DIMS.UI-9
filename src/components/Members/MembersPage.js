import React from 'react';
import Buttons from './Buttons/Buttons';
import api from '../../firebase/api';
import './members.css';
import FakerDB from '../../faker/FakerUsers';
import Spinner from '../common/Spinner/Spinner';

class MembersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      members: null,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.getMembers();
  }

  getMembers = () => {
    api.getMembers().then((result) => {
      let members = result.map((member, i) => {
        return (
          <tr key={member.userId} className={i % 2 ? 'darkLine' : 'whiteLine'}>
            <td key={member.userId + 'a'}>{i + 1}</td>
            <td key={member.userId + 'b'}>
              <a href=''>{member.firstName + ' ' + member.lastName}</a>
            </td>
            <td key={member.userId + 'c'}>{member.directionId}</td>
            <td key={member.userId + 'd'}>{member.education}</td>
            <td key={member.userId + 'i'}>{new Date(member.startDate).toLocaleDateString()}</td>
            <td key={member.userId + 'j'}>{new Date(member.birthDate).toLocaleDateString()}</td>
            <td key={member.userId + 'h'} className={'memberButtons'}>
              <Buttons />
            </td>
          </tr>
        );
      });
      this.setState({
        loading: false,
        members: members,
      });
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
    /*FakerDB.create(5);*/

    return (
      <div className={'membersTableContainer'}>{this.state.loading ? <Spinner /> : this.createMembersTable()}</div>
    );
  }
}

export default MembersPage;
