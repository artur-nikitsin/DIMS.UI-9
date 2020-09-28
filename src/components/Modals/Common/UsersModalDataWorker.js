import React from "react";
import "./userModalDataWorker.scss";
import SubmitButton from "../../common/Buttons/SubmitButton/SubmitButton";
import InputListCreator from "./ModalElements/InputListCreator";
import formValidator from "../../helpers/FormValidator/formValidator";
import dataExtractor from "../../helpers/DataExtractor/dataExtractor";
import { editMemberData } from "../../../firebase/apiSet";
import { setNewMemberData } from "../../../firebase/apiSet";

class UsersModalDataWorker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSubmit: false,
      inputsList: [],
      modalData: null,
      dataToSend: null,
      documentId: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    const { modalData, documentId } = this.props;
    this.setState({
      modalData: modalData,
      documentId: documentId
    });
  }


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


  handleValidInput = (input, status, data) => {

    let dataStore = this.props.modalTemplate;

    dataStore[input] = {
      isValid: status,
      data: data
    };

    this.setState({
      isFormValid: formValidator(dataStore),
      dataToSend: dataExtractor(dataStore)
    });
  };


  handleUnSubmit = () => {
    this.setState({
      isSubmit: false
    });
  };


  handleSubmit(event) {

    event.preventDefault();

    this.setState({
      isSubmit: true
    });

    if (this.state.isFormValid) {

      this.setState({
        isSubmit: true
      });

      const { documentId, dataToSend } = this.state;
      const { closeModalAndReload } = this.props;

      if (this.props.modalType === "Edit") {

        editMemberData(documentId, dataToSend)
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
          <InputListCreator
            modalTemplate={this.props.modalTemplate}
            modalData={this.props.modalData}
            handleSubmit={this.handleSubmit}
            handleUnSubmit={this.handleUnSubmit}
            handleValidInput={this.handleValidInput}
            isSubmit={this.state.isSubmit} />
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
