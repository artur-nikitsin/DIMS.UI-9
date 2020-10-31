import React from 'react';
import PropTypes from 'prop-types';
import formValidator from '../../helpers/FormValidator/formValidator';
import { setTask } from '../../../firebase/apiSet';
import { getExecutors } from '../../../firebase/apiGet';
import TextInput from '../../common/Inputs/TextInput';
import ModalContent from '../Common/ModalContent';
import ErrorWritingDocument from '../../common/Messages/Errors/ErrorWritingDocument';
import DropDownInput from '../../common/Inputs/DropDownInput';
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
      executor: null,
      membersList: null,

      name: null,
      startDate: null,
      deadlineDate: null,
      description: null,
      taskId: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.setTaskDataToState(taskData).then(() => {
        this.createInputList();
      });
    }
  }

  setTaskDataToState = async (data) => {
    if (data) {
      const { ...thisState } = this.state;
      const { modalTemplate } = this.props;

      await getMembersList().then((membersList) => {
        this.setState({
          membersList,
          inputsStatus: { ...modalTemplate },
          dataToSend: { ...modalTemplate },
        });
      });

      await getExecutors(data.taskId).then((users) => {
        this.setState({
          executor: users[0],
        });
      });

      for (const value in data) {
        if (thisState.hasOwnProperty(value)) {
          this.setState({
            [value]: data[value],
          });
        }
      }
    }
  };

  createInputList = () => {
    const { modalTemplate, modalType } = this.props;
    const { isSubmit, membersList, executor, ...thisState } = this.state;
    const dataKeys = Object.keys(modalTemplate);

    const inputList = dataKeys.map((input) => {
      if (input === 'executor' && membersList) {
        return (
          <li key={input} className='inputItem'>
            <DropDownInput
              handleDropInput={this.handleDropInput}
              value={executor}
              modalType={modalType}
              dataTemplate={membersList}
              label='Executor:'
            />
          </li>
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

    this.setState({
      inputList: <ul className='inputList'>{inputList}</ul>,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleDropInput = (event) => {
    const { value } = event.target;
    this.setState({
      executors: value,
    });
    this.handleValidInput('executors', true, value);
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

    this.setState({
      isSubmit: true,
    });

    if (isFormValid) {
      setTask(dataToSend, taskId)
        .then(() => {
          closeModalAndReload();
        })
        .catch((error) => ErrorWritingDocument(error));
    }
  }

  render() {
    const { closeModal, modalType } = this.props;
    const { inputList } = this.state;

    return (
      <ModalContent
        createInputList={inputList}
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
