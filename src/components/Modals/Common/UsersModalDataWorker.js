import React from "react";
import "./userModalDataWorker.scss";
import SubmitButton from "../../common/Buttons/SubmitButton/SubmitButton";
import InputListCreator from "./InputListCreator";

class UsersModalDataWorker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSubmit: false,
      inputsList: [],
      modalData: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRadioInput = this.handleRadioInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  isValid = {
    firstName: false,
    lastName: false,
    birthDate: false,
    directionId: false,
    education: false,
    startDate: false,
    email: false,
    sex: false,
    university: false,
    mathScore: false,
    adress: false,
    mobilePhone: false,
    skype: false
  };


  componentDidMount() {
    const { modalData } = this.props;
    this.setState({
      modalData: modalData
    });
  }


  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isSubmit: false
    });
  }

  handleRadioInput(event) {
    this.setState({
      sex: event.target.name
    });
  }


  handleValidInput = (input, status, data) => {

    console.log(input, status, data);
    this.isValid[input] = status;

    let statusArr = [];
    for (let input in this.isValid) {
      statusArr.push(this.isValid[input]);
    }

    if (!statusArr.includes(false)) {
      this.setState({
        isFormValid: true
      });
    }

  };

  handleUnSubmit = () => {
    this.setState({
      isSubmit: false
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      isSubmit: true
    });

    /* if (this.state.isFormValid) {

       this.setState({
         isSubmit: true
       });

       if (this.props.modalType === "Edit") {
         editMemberData(this.state).then((status) => {
           status === "OK" ? this.props.closeModalAndReload() : console.log(status);
         });
       } else {
         setNewMemberData(this.state).then((status) => {
           status === "OK" ? this.props.closeModalAndReload() : console.log(status);
         });
       }
     } else {
       this.setState({
         isSubmit: true
       });
     }*/

  }


  render() {

    return (
      <div className='modalData'>
        <form onSubmit={this.handleSubmit} className='userForm'>
          <InputListCreator
            modalTemplate={this.props.modalTemplate}
            modalData={this.props.modalData}
            handleSubmit={this.handleSubmit}
            handleUnSubmit={this.handleUnSubmit}
            handleValidInput={this.handleValidInput}
            isSubmit={this.state.isSubmit} />
        </form>

        <div className='modalButtons'>
          <SubmitButton handleSubmit={this.handleSubmit} />
          <button className='submitButton' onClick={this.props.closeModal}>
            Return to grid
          </button>
        </div>
      </div>
    );
  }
}

export default UsersModalDataWorker;
