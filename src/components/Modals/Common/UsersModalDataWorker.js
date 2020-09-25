import React from "react";
import "./userModalDataWorker.scss";
import { editMemberData, setNewMemberData } from "../../../firebase/apiSet";
import TextInput from "../../common/Inputs/TextInput";
import RadioInput from "./ModalElements/RadioInput";
import SubmitButton from "../../common/Buttons/SubmitButton/SubmitButton";


class UsersModalDataWorker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSubmit: false,
      inputsList: [],
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
    this.userPropsToState(this.props.userData, this.state);
  }


  userPropsToState = (userData, stateData) => {
    if (userData) {
      for (let key in stateData) {
        if (stateData.hasOwnProperty(key)) {
          this.setState({
              [key]: userData[key]
            }
          );
        }
      }
    }
  };


  createInputList = (data) => {

    let inputList = [];

    for (let input in data) {
      if (input !== "isFormValid" && input !== "isSubmit" && input !== "inputsList" && input !== "userId" && input !== "sex") {
        inputList.push(
          <li key={input} className="inputItem">
            <TextInput
              className={"inputField"}
              inputName={input} handleChange={this.handleChange}
              value={this.state[input]}
              handleValidInput={this.handleValidInput}
              isSubmit={this.state.isSubmit} />
          </li>
        );
      }
    }
    return inputList;
  };


  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
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

            {this.createInputList(this.state)}

            <li className='sexInputs'>
              <div className='radioInputs'>
                <span>Sex:</span>
                <RadioInput inputName='male' value={this.state.sex} handleRadioInput={this.handleRadioInput}
                            status={this.state.sex ? null : "invalid"} />
                <RadioInput inputName='female' value={this.state.sex} handleRadioInput={this.handleRadioInput} />
              </div>
            </li>
          </ul>
        </form>

        <div className='modalButtons'>
          <SubmitButton handleSubmit={this.handleSubmit} />
          <button className='submitButton' onClick={this.props.closeModal}>
            Return to grid
          </button>
        </div>
      </div>
    );
  }
}

export default UsersModalDataWorker;
