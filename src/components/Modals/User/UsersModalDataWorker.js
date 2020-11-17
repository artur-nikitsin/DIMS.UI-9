import React from 'react';
import PropTypes from 'prop-types';
import formValidator from '../../helpers/FormValidator/formValidator';
import { setNewMemberData } from '../../../firebase/apiSet';
import TextInput from '../../common/Inputs/TextInput/TextInput';
import DropDownInput from '../../common/Inputs/DropDownInput/DropDownInput';
import GenderInputs from './GenderInputs';
import ModalContent from '../Common/ModalContent';
import ErrorWritingDocument from '../../common/Messages/Errors/ErrorWritingDocument';
import { userModalConfiguration } from '../Common/ModalInputsTemplate';
import { connect } from 'react-redux';
import { register, setUserRole } from '../../../firebase/auth';
import faker from 'faker';
import getNestedObjectValues from '../../helpers/getNestedObjectValues/getNestedObjectValues';

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidInput = this.handleValidInput.bind(this);
  }

  componentDidMount() {
    const { userData } = this.props;
    this.setState((prevState) => {
      return {
        inputsStatus: getNestedObjectValues(userModalConfiguration, 'isDefaultValid', null),
        dataToSend: getNestedObjectValues(userModalConfiguration, null, ''),
      };
    });
    this.setUserDataToState(userData);
  }

  setUserDataToState = async (data) => {
    const { modalType } = this.props;

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
      this.handleValidInput(value, true, data[value]);
    }
  };

  createInputList() {
    const { modalType, directions } = this.props;
    const { isSubmit, ...thisState } = this.state;
    const inputKeys = Object.keys(userModalConfiguration);

    const inputList = inputKeys.map((input) => {
      if (input === 'sex') {
        return (
          <GenderInputs
            key={input}
            name={input}
            value={thisState[input]}
            handleChange={this.handleChange}
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
              name={input}
              handleDropInput={this.handleChange}
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
            type={userModalConfiguration[input].type}
            isDefaultValid={userModalConfiguration[input].isDefaultValid}
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
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    if (name === 'sex') {
      this.handleValidInput('sex', true, value);
    }
    if (name === 'directionId') {
      this.handleValidInput('directionId', true, value);
    }
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
    const { isFormValid, dataToSend } = this.state;
    const { closeModalAndReload, modalType } = this.props;

    this.setState({
      isSubmit: true,
    });

    if (isFormValid) {
      const { firstName, lastName, email, userId } = this.state;

      if (modalType === 'register') {
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
