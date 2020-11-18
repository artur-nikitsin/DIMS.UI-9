import React from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import formValidator from '../../helpers/FormValidator/formValidator';
import { setTask } from '../../../firebase/apiSet';
import { getExecutors } from '../../../firebase/apiGet';
import TextInput from '../../common/Inputs/TextInput/TextInput';
import ModalContent from '../Common/ModalContent';
import ErrorWritingDocument from '../../common/Messages/Errors/ErrorWritingDocument';
import CheckBoxList from '../../common/Inputs/CheckBoxList/CheckBoxList';
import getMembersList from '../../helpers/getMembersList/getMembersList';
import { unAssignTask, assignTaskToUsers } from '../../../firebase/assign';
import { taskModalConfiguration } from '../Common/ModalInputsTemplate';
import TextArea from '../../common/Inputs/TextArea/TextArea';
import getNestedObjectValues from '../../helpers/getNestedObjectValues/getNestedObjectValues';

class TaskModalDataWorker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSubmit: false,
      inputsStatus: null,
      dataToSend: null,
      executors: {},
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
    this.setState((prevState) => {
      return {
        inputsStatus: getNestedObjectValues(taskModalConfiguration, 'isDefaultValid', null),
        dataToSend: getNestedObjectValues(taskModalConfiguration, null, ''),
      };
    });
    this.setTaskDataToState(taskData);
  }

  setTaskDataToState = async (data) => {
    const { modalType } = this.props;

    await getMembersList().then((membersList) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          membersList,
        };
      });
    });

    if (data) {
      await getExecutors(data.taskId).then((users) => {
        this.setState({
          executors: users,
        });
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
        this.handleValidInput(value, true, data[value]);
      }
    }
  };

  createInputList = () => {
    const { modalType } = this.props;
    const { isSubmit, membersList, executors, ...thisState } = this.state;
    const dataKeys = Object.keys(taskModalConfiguration);

    const inputList = dataKeys.map((input) => {
      if (input === 'executors' && membersList) {
        return (
          <li key={input} className='checkBoxListContainer'>
            <CheckBoxList
              title='Executors:'
              isDefaultValid={taskModalConfiguration[input].isDefaultValid}
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
          <li key={input} className='descriptionContainer'>
            <TextArea
              inputName={input}
              isDefaultValid={taskModalConfiguration[input].isDefaultValid}
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
            type={taskModalConfiguration[input].type}
            isDefaultValid={taskModalConfiguration[input].isDefaultValid}
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

  handleRadioInput = (userId) => () => {
    this.setState((prevState) => {
      const { executors } = prevState;
      let newAssign = {};
      if (executors[userId]) {
        newAssign = { ...executors[userId] };
        newAssign.assign = !executors[userId].assign;
      } else {
        newAssign = { prevAssign: false, assign: true };
      }
      return {
        executors: { ...prevState.executors, [userId]: newAssign },
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
    const { isFormValid, taskId, dataToSend, executors } = this.state;
    const { closeModalAndReload } = this.props;
    const { deadlineDate, description, name, startDate } = dataToSend;
    this.setState({
      isSubmit: true,
    });
    if (isFormValid) {
      const executorsId = Object.keys(executors);
      const newExecutors = executorsId.map((userId) => {
        const { prevAssign, assign } = executors[userId];
        if (!prevAssign && assign) {
          return userId;
        }
        return null;
      });

      const unAssignExecutors = executorsId.map((userId) => {
        const { prevAssign, assign } = executors[userId];
        if (prevAssign && !assign) {
          return userId;
        }
        return null;
      });

      setTask({ deadlineDate, description, name, startDate }, taskId)
        .then(() => {
          unAssignTask(unAssignExecutors, taskId);
          assignTaskToUsers(newExecutors, taskId);
          closeModalAndReload();
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
