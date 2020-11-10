import React from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import formValidator from '../../helpers/FormValidator/formValidator';
import { setTask } from '../../../firebase/apiSet';
import { getExecutors } from '../../../firebase/apiGet';
import TextInput from '../../common/Inputs/TextInput';
import ModalContent from '../Common/ModalContent';
import ErrorWritingDocument from '../../common/Messages/Errors/ErrorWritingDocument';
import CheckInputList from '../../common/Inputs/CheckInputList';
import getMembersList from '../../helpers/getMembersList/getMembersList';
import { unAssignTask, assignTaskToUsers } from '../../../firebase/assign';
import { taskModalTypes } from '../Common/ModalInputsTemplate';
import TextArea from '../../common/Inputs/TextArea/TextArea';
import { connect } from 'react-redux';
import { setSuccessCreateTask, setSuccessUpdateTask } from '../../../redux/reducers/notificationReducer';

class TaskModalDataWorker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSubmit: false,
      inputsStatus: null,
      dataToSend: null,
      executors: [],
      unAssignUsers: [],
      membersList: null,
      dbSnapshot: [],

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
    if (taskData) {
      getExecutors(taskData.taskId).then((users) => {
        this.setState({
          dbSnapshot: users,
        });
      });
    }
    this.setTaskDataToState(taskData);
  }

  setTaskDataToState = async (data) => {
    const { modalTemplate, modalType } = this.props;

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
        this.handleValidInput('executors', true, users);
      });
    }

    if (modalType === 'create') {
      this.setState({
        taskId: faker.fake('{{random.number}}'),
      });
    }

    for (const value in data) {
      if (this.state.hasOwnProperty(value)) {
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
          <li key={input} className='inputItem'>
            <CheckInputList
              title='Executors:'
              dataTemplate={membersList}
              values={executors}
              modalType={modalType}
              handleRadioInput={this.handleRadioInput}
            />
          </li>
        );
      }
      if (input === 'description') {
        return (
          <li key={input} className='inputItem'>
            <TextArea
              inputName={input}
              value={thisState[input]}
              handleValidInput={this.handleValidInput}
              handleChange={this.handleChange}
              modalType={modalType}
            />
          </li>
        );
      }
      return (
        <li key={input} className='inputItem'>
          <TextInput
            type={taskModalTypes[input]}
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
      let { executors, unAssignUsers } = prevState;

      if (executors.includes(value)) {
        executors = executors.filter((index) => index !== value);
        unAssignUsers.push(value);
      } else {
        executors.push(value);
        unAssignUsers = unAssignUsers.filter((index) => index !== value);
      }
      return {
        executors,
        unAssignUsers,
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
    const { isFormValid, taskId, dataToSend, executors, unAssignUsers, dbSnapshot } = this.state;
    const { closeModalAndReload, setSuccessCreateTask, setSuccessUpdateTask, modalType } = this.props;
    const { deadlineDate, description, name, startDate } = dataToSend;
    this.setState({
      isSubmit: true,
    });
    if (isFormValid) {
      setTask({ deadlineDate, description, name, startDate }, taskId)
        .then(() => {
          unAssignTask(unAssignUsers, taskId);
          assignTaskToUsers(executors, dbSnapshot, taskId);
          closeModalAndReload();
        })
        .then(() => {
          if (modalType === 'create') {
            setSuccessCreateTask();
          }
          if (modalType === 'edit') {
            setSuccessUpdateTask();
          }
        })
        .catch((error) => {
          return ErrorWritingDocument(error);
        });
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

const mapStateToProps = (state) => {
  const { setSuccessCreateTask } = state.notifications;
  return {
    setSuccessCreateTask,
  };
};

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

export default connect(mapStateToProps, {
  setSuccessCreateTask,
  setSuccessUpdateTask,
})(TaskModalDataWorker);
