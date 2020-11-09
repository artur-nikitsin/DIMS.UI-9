import React from 'react';
import PropTypes from 'prop-types';
import formValidator from '../../helpers/FormValidator/formValidator';
import { setNewMemberData } from '../../../firebase/apiSet';
import TextInput from '../../common/Inputs/TextInput';
import DropDownInput from '../../common/Inputs/DropDownInput';
import GenderInputs from './GenderInputs';
import ModalContent from '../Common/ModalContent';
import ErrorWritingDocument from '../../common/Messages/Errors/ErrorWritingDocument';
import { userModalTypes } from '../Common/ModalInputsTemplate';
import { connect } from 'react-redux';
import { register, setUserRole } from '../../../firebase/auth';
import faker from 'faker';

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
    const { modalTemplate, modalType } = this.props;
    this.setState({
      inputsStatus: { ...modalTemplate },
      dataToSend: { ...modalTemplate },
    });

    if (modalType === 'register') {
      this.setState({
        userId: faker.fake('{{random.number}}'),
      });
    }

    for (const value in data) {
      if (this.state.hasOwnProperty(value)) {
        this.setState({
          [value]: data[value],
        });
      }
      if (value === 'sex') {
        this.handleValidInput('sex', true, data[value]);
      }
      if (value === 'directionId') {
        this.handleValidInput('directionId', true, data[value]);
      }
    }
  };

  createInputList = () => {
    const { modalTemplate, modalType, directions } = this.props;
    const { isSubmit, ...thisState } = this.state;
    const dataKeys = Object.keys(modalTemplate);

    const inputList = dataKeys.map((input) => {
      if (input === 'sex') {
        return (
          <GenderInputs
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
              dataTemplate={directions}
              label='Direction:'
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

  handleRadioInput = ({ target: { name, value } }) => {
    this.setState({
      sex: name,
    });
    this.handleValidInput('sex', true, value);
  };

  handleDropInput = ({ target: { value } }) => {
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
    const { closeModalAndReload, modalType } = this.props;

    this.setState({
      isSubmit: true,
    });

    if (isFormValid) {
      if (modalType === 'register') {
        const { firstName, lastName, userId, email } = this.state;
        register(email, '12345678');
        setUserRole({ firstName, lastName, userId, email });
      }
      setNewMemberData(dataToSend, userId)
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

const mapStateToProps = (state) => {
  const { directions } = state.members;
  return {
    directions,
  };
};

export default connect(mapStateToProps, {})(UsersModalDataWorker);
