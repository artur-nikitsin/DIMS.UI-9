import React from 'react';
import PropTypes from 'prop-types';
import formValidator from '../../helpers/FormValidator/formValidator';
import { setTrack } from '../../../firebase/apiSet';
import TextInput from '../../common/Inputs/TextInput/TextInput';
import ModalContent from '../Common/ModalContent';
import ErrorWritingDocument from '../../common/Messages/Errors/ErrorWritingDocument';
import { trackModalConfiguration } from '../Common/ModalInputsTemplate';
import TextArea from '../../common/Inputs/TextArea/TextArea';
import getNestedObjectValues from '../../helpers/getNestedObjectValues/getNestedObjectValues';

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
    this.setState((prevState) => {
      return {
        inputsStatus: getNestedObjectValues(trackModalConfiguration, 'isDefaultValid', null),
        dataToSend: getNestedObjectValues(trackModalConfiguration, null, ''),
      };
    });
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
    this.setState({
      inputsStatus: { ...modalTemplate },
      dataToSend: { ...modalTemplate },
    });
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
    const { isSubmit, ...thisState } = this.state;
    const dataKeys = Object.keys(trackModalConfiguration);

    const inputList = dataKeys.map((input) => {
      if (input === 'trackNote') {
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
            type={trackModalConfiguration[input].type}
            isDefaultValid={trackModalConfiguration[input].isDefaultValid}
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
