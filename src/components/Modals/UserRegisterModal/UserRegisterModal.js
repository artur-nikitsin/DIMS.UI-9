import React from 'react';
import './userRegisterrModal.scss';
import Modal from '../Common/Modal';

class UserRegisterModal extends React.Component {
  constructor(props) {
    super(props);
  }

  modalContent = (
    <ul className='userRegisterInputList'>
      <li>
        <label htmlFor='userName'>Name</label>
        <input type='text' id='userName' />
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

  render() {
    return <Modal modalContent={this.modalContent} modalType='Register' closeModal={this.props.closeModal} />;
  }
}

export default UserRegisterModal;
