import React from "react";
import "./taskModalDataWorker.scss";
import formValidator from "../../helpers/FormValidator/formValidator";
import { setTask } from "../../../firebase/apiSet";
import TextInput from "../../common/Inputs/TextInput";
import ModalContent from "../Common/ModalContent";
import PropTypes from "prop-types";
import ErrorWritingDocument from "../../common/Messages/Errors/ErrorWritingDocument";


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
    const { ...thisState } = this.state;
    const { modalTemplate } = this.props;
    this.setState(
      {
        inputsStatus: Object.assign({}, modalTemplate),
        dataToSend: Object.assign({}, modalTemplate)
      }
    );
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
    this.setState((prevState) => {
      return {
        dataToSend: { ...prevState.dataToSend, [input]: data },
        inputsStatus: { ...prevState.inputsStatus, [input]: status },
        isFormValid: formValidator({ ...prevState.inputsStatus, [input]: status })
      };
    });
  };


  handleSubmit(event) {
    event.persist();
    const { isFormValid, taskId, dataToSend } = this.state;
    const { reloadTaskPage, closeModalAndReload, modalType } = this.props;

    this.setState({
      isSubmit: true
    });

    if (isFormValid) {
      setTask(dataToSend, taskId)
        .then(() => {
          closeModalAndReload();
        })
        .catch(error => ErrorWritingDocument(error));
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

TaskModalDataWorker.propTypes = {
  modalTemplate: PropTypes.shape({
    name: PropTypes.string,
    startDate: PropTypes.string,
    deadlineDate: PropTypes.string,
    description: PropTypes.string
  }),
  taskData: PropTypes.shape({
    deadlineDate: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    startDate: PropTypes.string,
    taskId: PropTypes.string
  }),
  modalType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  closeModalAndReload: PropTypes.func
};
export default TaskModalDataWorker;
