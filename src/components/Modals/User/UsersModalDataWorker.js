import React from "react";
import "./userModalDataWorker.scss";
import SubmitButton from "../../common/Buttons/SubmitButton/SubmitButton";
import formValidator from "../../helpers/FormValidator/formValidator";
import { editMemberData } from "../../../firebase/apiSet";
import { setNewMemberData } from "../../../firebase/apiSet";
import TextInput from "../../common/Inputs/TextInput";
import RadioInputList from "./RadioInputList";

class UsersModalDataWorker extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSubmit: false,
      inputsStatus: null,
      dataToSend: null,
      userData: null,

      firstName: null,
      lastName: null,
      birthDate: null,
      directionId: null,
      education: null,
      startDate: null,
      sex: null,
      email: null,
      university: null,
      mathScore: null,
      adress: null,
      mobilePhone: null,
      skype: null,
      userId: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRadioInput = this.handleRadioInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {

    const { userData, modalTemplate } = this.props;

    const inputsStatus = {};
    const dataToSend = {};
    Object.assign(inputsStatus, modalTemplate);
    Object.assign(dataToSend, modalTemplate);

    this.setUserDataToState(userData);
    this.setState({
      inputsStatus: inputsStatus,
      dataToSend: dataToSend
    });
  }

  setUserDataToState = (data) => {
    const {...thisState} = this.state;
    for (let value in data) {
      if (thisState.hasOwnProperty(value)) {
        this.setState({
          [value]: data[value]
        });
      }
    }
  };

  createInputList = () => {
    const { modalTemplate } = this.props;
    const { isSubmit, ...thisState } = this.state;
    const dataKeys = Object.keys(modalTemplate);

    const inputList = dataKeys.map((input) => {
      if (input === "sex") {
        return (
          <RadioInputList key={input} name={input} value={thisState[input]}
                          handleRadioInput={this.handleRadioInput}
                          handleValidInput={this.handleValidInput}
                          isSubmit={isSubmit} />
        );
      }
      return (
        <li key={input} className="inputItem">
          <TextInput inputName={input}
                     value={thisState[input]}
                     handleChange={this.handleChange}
                     handleValidInput={this.handleValidInput}
                     isSubmit={isSubmit} />
        </li>
      );
    });

    return (
      <ul className="userRegisterInputList">
        {inputList}
      </ul>
    );
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleRadioInput = (event) => {
    const { name } = event.target;
    this.setState({
      sex: name
    });
  };


  handleValidInput = (input, status, data) => {

    let { inputsStatus, dataToSend } = this.state;

    inputsStatus[input] = status;
    dataToSend[input] = data;

    this.setState({
      isFormValid: formValidator(inputsStatus),
      dataToSend: dataToSend
    });
  };


  handleSubmit(event) {

    event.preventDefault();
    const { isFormValid, userId, dataToSend } = this.state;
    const { closeModalAndReload } = this.props;

    this.setState({
      isSubmit: true
    });

    if (isFormValid) {

      if (this.props.modalType === "Edit") {

        editMemberData(userId, dataToSend)
          .then(closeModalAndReload())
          .catch(function(error) {
            console.log("Error writing document:", error);
          });
      } else {
        setNewMemberData(
          dataToSend).then(closeModalAndReload())
          .catch(function(error) {
            console.log("Error writing document:", error);
          });
      }
    }
  }

  render() {
    const { closeModal } = this.props;
    return (
      <div className='modalData'>
        <form className='userForm'>
          {this.createInputList()}
        </form>

        <div className='modalButtons'>
          <SubmitButton handleSubmit={this.handleSubmit} />
          <button className='submitButton' onClick={closeModal}>
            Return to grid
          </button>
        </div>
      </div>
    );
  }
}

export default UsersModalDataWorker;
