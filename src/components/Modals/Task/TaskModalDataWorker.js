import React from "react";
import "./taskModalDataWorker.scss";
import formValidator from "../../helpers/FormValidator/formValidator";
import { editMemberData, editTask } from "../../../firebase/apiSet";
import { createTask } from "../../../firebase/apiSet";
import TextInput from "../../common/Inputs/TextInput";
import ModalContent from "../Common/ModalContent";


class TaskModalDataWorker extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSubmit: false,
      inputsStatus: null,
      dataToSend: null,

      name: null,
      startDate: null,
      deadlineDate: null,
      description: null,
      taskId: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    const { taskData } = this.props;
    this.setTaskDataToState(taskData);
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    const { taskData } = this.props;
    const { taskData: prevTaskData } = prevProps;
    if (prevTaskData !== taskData) {
      const { taskData } = this.props;
      this.setTaskDataToState(taskData);
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
    const { modalTemplate } = this.props;
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
            isSubmit={isSubmit} />
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
    const { isFormValid, taskId, dataToSend } = this.state;
    const { reloadTaskPage, closeModal } = this.props;

    this.setState({
      isSubmit: true
    });

    if (isFormValid) {

      if (this.props.modalType === "Edit") {

        editTask(taskId, dataToSend)
          .then(() => {
            closeModal();
            reloadTaskPage();
          })
          .catch(function(error) {
            console.log("Error writing document:", error);
          });
      } else {
        createTask(dataToSend).then(() => {
          closeModal();
          reloadTaskPage();
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

export default TaskModalDataWorker;
