import React from 'react';
import PropTypes from 'prop-types';
import formValidator from '../../helpers/FormValidator/formValidator';
import { setTrack } from '../../../firebase/apiSet';
import TextInput from '../../common/Inputs/TextInput';
import ModalContent from '../Common/ModalContent';
import ErrorWritingDocument from '../../common/Messages/Errors/ErrorWritingDocument';

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
      trackNote: null,
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
    const { ...thisState } = this.state;
    const { modalTemplate } = this.props;
    this.setState({
      inputsStatus: { ...modalTemplate },
      dataToSend: { ...modalTemplate },
    });
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
    const { isSubmit, ...thisState } = this.state;
    const dataKeys = Object.keys(modalTemplate);

    const inputList = dataKeys.map((input) => {
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
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
    const { isFormValid, taskTrackId, dataToSend } = this.state;
    const { closeModalAndReload } = this.props;

    this.setState({
      isSubmit: true,
    });

    if (isFormValid) {
      const { userTaskId } = this.props;
      setTrack({ ...dataToSend, userTaskId }, taskTrackId)
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

TrackModalDataWorker.propTypes = {
  modalTemplate: PropTypes.shape({
    trackDate: PropTypes.string,
    trackNote: PropTypes.string,
  }),
  trackData: PropTypes.shape({
    taskTrackId: PropTypes.string,
    trackDate: PropTypes.string,
    trackNote: PropTypes.string,
    userTaskId: PropTypes.string,
  }),
  userTaskId: PropTypes.string,
  modalType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  closeModalAndReload: PropTypes.func.isRequired,
};

export default TrackModalDataWorker;
