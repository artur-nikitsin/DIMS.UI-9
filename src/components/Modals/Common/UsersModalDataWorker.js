import React from 'react';
import './userModalDataWorker.scss';
import { editMemberData, setNewMemberData } from '../../../firebase/apiSet';
import TextInput from './TextInput';
import RadioInput from './RadioInput';


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
    this.handleRadioInput = this.handleRadioInput.bind(this);
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleRadioInput(event) {
    this.setState({
      sex: event.target.name,
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
            <TextInput inputName='firstName' handleChange={this.handleChange} value={this.state.firstName}/>
            <TextInput inputName='lastName' handleChange={this.handleChange} value={this.state.lastName}/>
            <TextInput inputName='directionId' handleChange={this.handleChange} value={this.state.directionId}/>
            <TextInput inputName='education' handleChange={this.handleChange} value={this.state.education}/>
            <TextInput inputName='startDate' handleChange={this.handleChange} value={this.state.startDate}/>
            <TextInput inputName='email' handleChange={this.handleChange} value={this.state.email}/>
          </ul>

          <ul className='userRegisterInputList'>
            <li className='sexInputs'>
              <div className='radioInputs'>
                <span>Sex:</span>
                <RadioInput inputName='male' value={this.state.sex} handleRadioInput={this.handleRadioInput}/>
                <RadioInput inputName='female' value={this.state.sex} handleRadioInput={this.handleRadioInput}/>
              </div>
            </li>

            <TextInput inputName='university' handleChange={this.handleChange} value={this.state.university}/>
            <TextInput inputName='mathScore' handleChange={this.handleChange} value={this.state.mathScore}/>
            <TextInput inputName='adress' handleChange={this.handleChange} value={this.state.adress}/>
            <TextInput inputName='mobilePhone' handleChange={this.handleChange} value={this.state.mobilePhone}/>
            <TextInput inputName='skype' handleChange={this.handleChange} value={this.state.skype}/>
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
