import React from 'react';
import './userModalDataWorker.scss';
import { editMemberData, setNewMemberData } from '../../../firebase/apiSet';

class UsersModalDataWorker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      firstName: null,
      lastName: null,
      birthDate: null,
      directionId: null,
      education: null,
      startDate: null,
      userId: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.userData) {
      this.setState({
        firstName: this.props.userData.firstName,
        lastName: this.props.userData.lastName,
        birthDate: this.props.userData.birthDate,
        directionId: this.props.userData.directionId,
        education: this.props.userData.education,
        startDate: this.props.userData.startDate,
        userId: this.props.userData.userId,
      });
    }
  }

  handleChange(event, input) {
    this.setState({
      [input]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.modalType === 'Edit') {
      editMemberData(this.state).then((status) => {
        status === 'OK' ? this.props.closeModalAndReload() : console.log(status);
      });
    } else {
      setNewMemberData(this.state).then((status) => {
        status === 'OK' ? this.props.closeModalAndReload() : console.log(status);
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul className='userRegisterInputList'>
          <li>
            <label htmlFor='userName'>Name</label>
            <input
              type='text'
              id='userName'
              value={this.state.firstName ? this.state.firstName : ''}
              onChange={(event) => this.handleChange(event, 'firstName')}
            />
          </li>

          <li>
            <label htmlFor='userLastName'>Last Name</label>
            <input
              type='text'
              id='userLastName'
              value={this.state.lastName ? this.state.lastName : ''}
              onChange={(event) => this.handleChange(event, 'lastName')}
            />
          </li>

          <li>
            <label htmlFor='userDirection'>Direction</label>
            <input
              type='text'
              id='userDirection'
              value={this.state.directionId ? this.state.directionId : ''}
              onChange={(event) => this.handleChange(event, 'directionId')}
            />
          </li>

          <li>
            <label htmlFor='userEducation'>Education</label>
            <input
              type='text'
              id='userEducation'
              value={this.state.education ? this.state.education : ''}
              onChange={(event) => this.handleChange(event, 'education')}
            />
          </li>

          <li>
            <label htmlFor='userStartDate'>Start date</label>
            <input
              type='text'
              id='userStartDate'
              value={this.state.startDate ? new Date(this.state.startDate).toLocaleDateString() : ''}
              onChange={(event) => this.handleChange(event, 'startDate')}
            />
          </li>
        </ul>
        <input type='submit' className='submitButton' value={this.props.modalType} />
        {/* <button className='submitButton' onClick={this.handleSubmit}>{this.props.modalType}</button>*/}
      </form>
    );
  }
}

export default UsersModalDataWorker;
