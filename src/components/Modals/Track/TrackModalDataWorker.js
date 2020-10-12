import React from "react";
import "./taskModalDataWorker.scss";
import formValidator from "../../helpers/FormValidator/formValidator";
import { createTrack, editTrack } from "../../../firebase/apiSet";
import TextInput from "../../common/Inputs/TextInput";
import ModalContent from "../Common/ModalContent";
import PropTypes from "prop-types";



class TrackModalDataWorker extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSubmit: false,
      inputsStatus: null,
      dataToSend: null,

      taskTrackId: null,
      userTaskId: null,
      trackDate: null,
      trackNote: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    const { trackData } = this.props;
    this.setTaskDataToState(trackData);
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    const { trackData } = this.props;
    const { trackData: prevTrackData } = prevProps;
    if (prevTrackData !== trackData) {
      const { trackData } = this.props;
      this.setTaskDataToState(trackData);
    }
  }

  setTaskDataToState = (data) => {

    const { modalTemplate } = this.props;
    const inputsStatus = {};
    const dataToSend = {};
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
    const { modalTemplate, modalType } = this.props;
    const { isSubmit, ...thisState } = this.state;
    const dataKeys = Object.keys(modalTemplate);

    const inputList = dataKeys.map((input) => {

      return (
        <li key={input} className="inputItem">
          <TextInput
            type="text"
            inputName={input}
            value={thisState[input]}
            handleChange={this.handleChange}
            handleValidInput={this.handleValidInput}
            isSubmit={isSubmit}
            modalType={modalType} />
        </li>
      );
    });

    return (
      <ul className="tasksInputList">
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
    const { isFormValid, taskTrackId, userTaskId, dataToSend } = this.state;
    const { reloadTrackPage, closeModal, modalType } = this.props;

    this.setState({
      isSubmit: true
    });

    if (isFormValid) {

      if (modalType === "edit") {
        editTrack(taskTrackId, { ...dataToSend, userTaskId })
          .then(() => {
            closeModal();
            reloadTrackPage();
          })
          .catch(function(error) {
            console.log("Error writing document:", error);
          });
      }
      if (modalType === "register") {
        const { userTaskId } = this.props;
        createTrack({ ...dataToSend, userTaskId }).then(() => {
          closeModal();
          reloadTrackPage();
        })
          .catch(function(error) {
            console.log("Error writing document:", error);
          });
      }
    }
  }


  render() {
    const { closeModal, modalType } = this.props;
    return (
      <ModalContent createInputList={this.createInputList()}
                    handleSubmit={this.handleSubmit}
                    closeModal={closeModal}
                    modalType={modalType} />
    );
  }
}

TrackModalDataWorker.propTypes = {
  modalTemplate: PropTypes.object.isRequired,
  trackData: PropTypes.object,
  userTaskId: PropTypes.string,
  modalType: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  reloadTrackPage: PropTypes.func.isRequired
};
export default TrackModalDataWorker;
