import React from 'react';
import PropTypes from 'prop-types';
import formValidator from '../../helpers/FormValidator/formValidator';
import { setNewMemberData } from '../../../firebase/apiSet';
import TextInput from '../../common/Inputs/TextInput';
import DropDownInput from '../../common/Inputs/DropDownInput';
import RadioInputList from './RadioInputList';
import ModalContent from '../Common/ModalContent';
import ErrorWritingDocument from '../../common/Messages/Errors/ErrorWritingDocument';
import { userModalTypes } from '../Common/ModalInputsTemplate';
import { DropDownTemplate } from './DropDownTemptale';

class UsersModalDataWorker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSubmit: false,
      userData: null,
      inputsStatus: null,
      dataToSend: null,

      firstName: null,
      lastName: null,
      birthDate: null,
      directionId: null,
      education: null,
      startDate: null,
      sex: null,
      email: null,
      university: null,
      mathScore: null,
      address: null,
      mobilePhone: null,
      skype: null,
      userId: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRadioInput = this.handleRadioInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidInput = this.handleValidInput.bind(this);
  }

  componentDidMount() {
    const { userData } = this.props;
    this.setUserDataToState(userData);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { userData } = this.props;
    const { userData: prevUserData } = prevProps;
    if (prevUserData !== userData) {
      const { userData } = this.props;
      this.setUserDataToState(userData);
    }
  }

  setUserDataToState = (data) => {
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
      if (input === 'sex') {
        return (
          <RadioInputList
            key={input}
            name={input}
            value={thisState[input]}
            handleRadioInput={this.handleRadioInput}
            handleValidInput={this.handleValidInput}
            isSubmit={isSubmit}
            modalType={modalType}
          />
        );
      }
      if (input === 'directionId') {
        return (
          <li key={input} className='inputItem'>
            <DropDownInput
              handleDropInput={this.handleDropInput}
              value={thisState[input]}
              modalType={modalType}
              dataTemplate={DropDownTemplate}
            />
          </li>
        );
      }
      return (
        <li key={input} className='inputItem'>
          <TextInput
            type={userModalTypes[input]}
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

  handleRadioInput = (event) => {
    const { name } = event.target;
    this.setState({
      sex: name,
    });
  };

  handleDropInput = (event) => {
    const { value } = event.target;
    this.setState({
      directionId: value,
    });
    this.handleValidInput('directionId', true, value);
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
    const { isFormValid, userId, dataToSend } = this.state;
    const { closeModalAndReload } = this.props;

    this.setState({
      isSubmit: true,
    });

    if (isFormValid) {
      setNewMemberData(dataToSend, userId)
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

UsersModalDataWorker.propTypes = {
  modalTemplate: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthDate: PropTypes.string,
    directionId: PropTypes.string,
    education: PropTypes.string,
    startDate: PropTypes.string,
    email: PropTypes.string,
    university: PropTypes.string,
    mathScore: PropTypes.string,
    address: PropTypes.string,
    mobilePhone: PropTypes.string,
    skype: PropTypes.string,
    sex: PropTypes.string,
  }),
  userData: PropTypes.shape({
    address: PropTypes.string,
    birthDate: PropTypes.string,
    directionId: PropTypes.string,
    education: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mathScore: PropTypes.string,
    mobilePhone: PropTypes.string,
    sex: PropTypes.string,
    skype: PropTypes.string,
    startDate: PropTypes.string,
    university: PropTypes.string,
    userId: PropTypes.string,
  }),
  modalType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  closeModalAndReload: PropTypes.func.isRequired,
};

export default UsersModalDataWorker;
