import React, { useLayoutEffect } from 'react';
import Buttons from './Buttons/Buttons';
import api from '../../firebase/api';
import './members.css';
import FakerUsers from '../../faker/FakerUsers';

class MembersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
    };
  }

  componentDidMount() {
    api.getMembers().then((result) => {
      let members = result.map((member, i) => {
        return (
          <tr key={member.userId} className={i % 2 ? 'darkLine' : 'wkiteLine'}>
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
        members: members,
      });
    });
  }

  render() {
    const membersTableHeaders = () => {
      return (
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Direction</th>
            <th>Education</th>
            <th>Start</th>
            <th>Age</th>
            <th></th>
          </tr>
        </thead>
      );
    };
    console.log(this.state.members);

    //create fake users when init (prod. delete)
    FakerUsers.create(5);

    return (
      <div className={'membersTableContainer'}>
        <table className={'membersTable'}>
          {membersTableHeaders()}
          <tbody>{this.state.members}</tbody>
        </table>
      </div>
    );
  }
}

export default MembersPage;
