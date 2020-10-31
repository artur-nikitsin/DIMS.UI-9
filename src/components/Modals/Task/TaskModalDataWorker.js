import React from 'react';
import PropTypes from 'prop-types';
import formValidator from '../../helpers/FormValidator/formValidator';
import { setTask } from '../../../firebase/apiSet';
import { getExecutors } from '../../../firebase/apiGet';
import TextInput from '../../common/Inputs/TextInput';
import ModalContent from '../Common/ModalContent';
import ErrorWritingDocument from '../../common/Messages/Errors/ErrorWritingDocument';
import RadioInputList from '../../common/Inputs/RadioInputList';
import getMembersList from '../../helpers/getMembersList/getMembersList';

class TaskModalDataWorker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSubmit: false,
      inputsStatus: null,
      inputList: [],
      dataToSend: null,
      executors: [],
      membersList: null,

      name: null,
      startDate: null,
      deadlineDate: null,
      description: null,
      taskId: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioInput = this.handleRadioInput.bind(this);
    this.handleValidInput = this.handleValidInput.bind(this);
  }

  componentDidMount() {
    const { taskData } = this.props;
    this.setTaskDataToState(taskData).then(() => {
      this.createInputList();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { taskData } = this.props;
    const { taskData: prevTaskData } = prevProps;
    if (prevTaskData !== taskData) {
      const { taskData } = this.props;
      this.setTaskDataToState(taskData);
    }
  }

  setTaskDataToState = async (data) => {
    const { ...thisState } = this.state;
    const { modalTemplate } = this.props;

    await getMembersList().then((membersList) => {
      this.setState({
        membersList,
        inputsStatus: { ...modalTemplate },
        dataToSend: { ...modalTemplate },
      });
    });

    if (data) {
      await getExecutors(data.taskId).then((users) => {
        this.setState({
          executors: users,
        });
      });
    }

    for (const value in data) {
      if (thisState.hasOwnProperty(value)) {
        this.setState({
          [value]: data[value],
        });
      }
    }
  };

  createInputList = () => {
    const { modalTemplate, modalType } = this.props;
    const { isSubmit, membersList, executors, ...thisState } = this.state;
    const dataKeys = Object.keys(modalTemplate);

    const inputList = dataKeys.map((input) => {
      if (input === 'executors' && membersList) {
        return (
          <RadioInputList
            dataTemplate={membersList}
            values={executors}
            modalType={modalType}
            handleRadioInput={this.handleRadioInput}
          />
        );
      }
      return (
        <li key={input} className='inputItem'>
          <TextInput
            type='text'
            inputName={input}
            value={thisState[input]}
            handleChange={this.handleChange}
            handleValidInput={this.handleValidInput}
            isSubmit={isSubmit}
            modalType={modalType}
          />
        </li>
      );
    });

    return <ul className='inputList'>{inputList}</ul>;
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleRadioInput = (value) => () => {
    this.setState((prevState) => {
      const newExecutors = prevState.executors;
      newExecutors.push(value);
      return {
        executors: newExecutors,
      };
    });
    const { executors } = this.state;
    this.handleValidInput('executors', true, executors);
  };

  handleValidInput = (input, status, data) => {
    this.setState((prevState) => {
      return {
        dataToSend: { ...prevState.dataToSend, [input]: data },
        inputsStatus: { ...prevState.inputsStatus, [input]: status },
        isFormValid: formValidator({ ...prevState.inputsStatus, [input]: status }),
      };
    });
  };

  handleSubmit(event) {
    event.persist();
    const { isFormValid, taskId, dataToSend } = this.state;
    const { closeModalAndReload } = this.props;
    const { deadlineDate, description, executors, name, startDate } = dataToSend;
    this.setState({
      isSubmit: true,
    });
    if (isFormValid) {
      setTask({ deadlineDate, description, executors, name, startDate }, taskId)
        .then(() => {
          closeModalAndReload();
        })
        .catch((error) => ErrorWritingDocument(error));
    }
  }

  render() {
    const { closeModal, modalType } = this.props;
    return (
      <ModalContent
        createInputList={this.createInputList()}
        handleSubmit={this.handleSubmit}
        closeModal={closeModal}
        modalType={modalType}
      />
    );
  }
}

TaskModalDataWorker.propTypes = {
  modalTemplate: PropTypes.shape({
    name: PropTypes.string,
    startDate: PropTypes.string,
    deadlineDate: PropTypes.string,
    description: PropTypes.string,
  }),
  taskData: PropTypes.shape({
    deadlineDate: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    startDate: PropTypes.string,
    taskId: PropTypes.string,
  }),
  modalType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  closeModalAndReload: PropTypes.func,
};
export default TaskModalDataWorker;
