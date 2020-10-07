import React from "react";
import "./userModalDataWorker.scss";
import formValidator from "../../helpers/FormValidator/formValidator";
import { editMemberData } from "../../../firebase/apiSet";
import { setNewMemberData } from "../../../firebase/apiSet";
import TextInput from "../../common/Inputs/TextInput";
import RadioInputList from "./RadioInputList";
import ModalContent from "../Common/ModalContent";

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
    this.handleValidInput = this.handleValidInput.bind(this);
  }


  componentDidMount() {
    const { userData } = this.props;
    this.setUserDataToState(userData);
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    const { userData } = this.props;
    const { userData: prevUserData } = prevProps;
    if (prevUserData !== userData) {
      const { userData } = this.props;

      this.setUserDataToState(userData);
    }
  }


  setUserDataToState = (data) => {
    const inputsStatus = {};
    const dataToSend = {};
    const { modalTemplate } = this.props;

    Object.assign(inputsStatus, modalTemplate);
    Object.assign(dataToSend, modalTemplate);

    this.setState({
      inputsStatus: inputsStatus,
      dataToSend: dataToSend
    });
    const { ...thisState } = this.state;
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
          <TextInput
            type="text"
            inputName={input}
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

    event.persist();
    const { isFormValid, userId, dataToSend } = this.state;
    const { reloadMemberPage, modalType, closeModal } = this.props;

    this.setState({
      isSubmit: true
    });


    if (isFormValid) {
      if (modalType === "Edit") {

        editMemberData(userId, dataToSend)
          .then(() => {
            closeModal();
            reloadMemberPage();
          })
          .catch(function(error) {
            console.log("Error writing document:", error);
          });
      } else {
        setNewMemberData(
          dataToSend).then(() => {
          closeModal();
          reloadMemberPage();
        })
          .catch(function(error) {
            console.log("Error writing document:", error);
          });
      }

    }
  }


  render() {
    const { closeModal } = this.props;
    return (
      <ModalContent createInputList={this.createInputList()}
                    handleSubmit={this.handleSubmit}
                    closeModal={closeModal} />
    );
  }
}

export default UsersModalDataWorker;
