import React from "react";
import "./userModalDataWorker.scss";
import { editMemberData, setNewMemberData } from "../../../firebase/apiSet";
import TextInput from "./ModalElements/TextInput";
import RadioInput from "./ModalElements/RadioInput";


class UsersModalDataWorker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSubmit: false,
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
      skype: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRadioInput = this.handleRadioInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  isValid = {
    firstName: false,
    lastName: false,
    birthDate: false,
    directionId: false,
    education: false,
    startDate: false,
    email: false,
    sex: false,
    university: false,
    mathScore: false,
    adress: false,
    mobilePhone: false,
    skype: false
  };


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
        skype: this.props.userData.skype
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      isSubmit: false
    });
  }

  handleRadioInput(event) {
    this.setState({
      sex: event.target.name
    });
  }


  handleValidInput = (input, status) => {

    this.isValid[input] = status;

    let statusArr = [];
    for (let input in this.isValid) {
      statusArr.push(this.isValid[input]);
    }

    if (!statusArr.includes(false)) {
      this.setState({
        isFormValid: true
      });
    }

  };

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.isFormValid) {

      this.setState({
        isSubmit: true
      });

      if (this.props.modalType === "Edit") {
        editMemberData(this.state).then((status) => {
          status === "OK" ? this.props.closeModalAndReload() : console.log(status);
        });
      } else {
        setNewMemberData(this.state).then((status) => {
          status === "OK" ? this.props.closeModalAndReload() : console.log(status);
        });
      }
    } else {
      this.setState({
        isSubmit: true
      });
    }

  }


  render() {

    return (
      <div className='modalData'>
        <form onSubmit={this.handleSubmit} className='userForm'>
          <ul className='userRegisterInputList'>
            <TextInput inputName='firstName' handleChange={this.handleChange} value={this.state.firstName}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
            <TextInput inputName='lastName' handleChange={this.handleChange} value={this.state.lastName}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
            <TextInput inputName='directionId' handleChange={this.handleChange} value={this.state.directionId}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
            <TextInput inputName='education' handleChange={this.handleChange} value={this.state.education}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
            <TextInput inputName='startDate' handleChange={this.handleChange} value={this.state.startDate}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
            <TextInput inputName='email' handleChange={this.handleChange} value={this.state.email}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
          </ul>

          <ul className='userRegisterInputList'>
            <li className='sexInputs'>
              <div className='radioInputs'>
                <span>Sex:</span>
                <RadioInput inputName='male' value={this.state.sex} handleRadioInput={this.handleRadioInput}
                            status={this.state.sex? null: 'invalid'}/>
                <RadioInput inputName='female' value={this.state.sex} handleRadioInput={this.handleRadioInput} />
              </div>
            </li>

            <TextInput inputName='university' handleChange={this.handleChange} value={this.state.university}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
            <TextInput inputName='mathScore' handleChange={this.handleChange} value={this.state.mathScore}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
            <TextInput inputName='adress' handleChange={this.handleChange} value={this.state.adress}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
            <TextInput inputName='mobilePhone' handleChange={this.handleChange} value={this.state.mobilePhone}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
            <TextInput inputName='skype' handleChange={this.handleChange} value={this.state.skype}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
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
