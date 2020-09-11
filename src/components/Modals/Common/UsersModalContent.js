import React from 'react';
import './userModalContent.scss';
import { getMember } from '../../../firebase/apiGet';
import Spinner from '../../common/Spinner/Spinner';

class UsersModalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
    };
  }

  render() {
    return (
      <ul className='userRegisterInputList'>
        <li>
          <label htmlFor='userName'>Name</label>
          <input type='text' id='userName' value={this.props.userData ? this.props.userData.firstName : ''} />
        </li>

        <li>
          <label htmlFor='userLastName'>Last Name</label>
          <input type='text' id='userLastName' />
        </li>

        <li>
          <label htmlFor='userDirection'>Direction</label>
          <input type='text' id='userDirection' />
        </li>

        <li>
          <label htmlFor='userEducation'>Education</label>
          <input type='text' id='userEducation' />
        </li>

        <li>
          <label htmlFor='userStartDate'>Start date</label>
          <input type='text' id='userStartDate' />
        </li>
      </ul>
    );
  }
}

export default UsersModalContent;
