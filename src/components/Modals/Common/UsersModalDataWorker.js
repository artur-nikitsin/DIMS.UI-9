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
      email: null,
      sex: null,
      university: null,
      mathScore: null,
      adress: null,
      mobilePhone: null,
      skype: null,
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
        email: this.props.userData.email,
        sex: this.props.userData.sex,
        university: this.props.userData.university,
        mathScore: this.props.userData.mathScore,
        adress: this.props.userData.adress,
        mobilePhone: this.props.userData.mobilePhone,
        skype: this.props.userData.skype,
      });
    }
  }

  handleChange(event, input) {
    this.setState({
      [input]: event.target.value,
    });
  }

  handleRadioInput(event, value) {
    this.setState({
      sex: value,
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
      <div className='modalData'>
        <form onSubmit={this.handleSubmit} className='userForm'>
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

            <li>
              <label htmlFor='userEmail'>Email</label>
              <input
                type='text'
                id='userEmail'
                value={this.state.email ? this.state.email : ''}
                onChange={(event) => this.handleChange(event, 'email')}
              />
            </li>
          </ul>

          <ul className='userRegisterInputList'>
            <li className='sexInputs'>
              <div className='radioInputs'>
                <span>Sex:</span>

                <div className='radioButton'>
                  <input
                    type='radio'
                    id='userMale'
                    checked={this.state.sex === 'male'}
                    value={this.state.sex ? this.state.sex : ''}
                    onChange={(event) => this.handleRadioInput(event, 'male')}
                  />
                  <label htmlFor='userMale'>Male</label>
                </div>

                <div className='radioButton'>
                  <input
                    type='radio'
                    id='userFemale'
                    checked={this.state.sex === 'female'}
                    value={this.state.sex ? this.state.sex : ''}
                    onChange={(event) => this.handleRadioInput(event, 'female')}
                  />
                  <label htmlFor='userFemale'>Female</label>
                </div>
              </div>
            </li>

            <li>
              <label htmlFor='userUniversity'>University</label>
              <input
                type='text'
                id='userUniversity'
                value={this.state.university ? this.state.university : ''}
                onChange={(event) => this.handleChange(event, 'university')}
              />
            </li>

            <li>
              <label htmlFor='userMathScore'>Math Score</label>
              <input
                type='text'
                id='userMathScore'
                value={this.state.mathScore ? this.state.mathScore : ''}
                onChange={(event) => this.handleChange(event, 'mathScore')}
              />
            </li>

            <li>
              <label htmlFor='userAdress'>Adress</label>
              <input
                type='text'
                id='userAdress'
                value={this.state.adress ? this.state.adress : ''}
                onChange={(event) => this.handleChange(event, 'adress')}
              />
            </li>

            <li>
              <label htmlFor='userMobilePhone'>Mobile Phone</label>
              <input
                type='text'
                id='userMobilePhone'
                value={this.state.mobilePhone ? this.state.mobilePhone : ''}
                onChange={(event) => this.handleChange(event, 'mobilePhone')}
              />
            </li>

            <li>
              <label htmlFor='userSkype'>Skype</label>
              <input
                type='text'
                id='userSkype'
                value={this.state.skype ? this.state.skype : ''}
                onChange={(event) => this.handleChange(event, 'skype')}
              />
            </li>
          </ul>
        </form>

        <div className='modalButtons'>
          <button className='submitButton' onClick={this.handleSubmit}>
            Save
          </button>
          <button className='submitButton' onClick={this.props.closeModal}>
            Return to grid
          </button>
        </div>
      </div>
    );
  }
}

export default UsersModalDataWorker;
