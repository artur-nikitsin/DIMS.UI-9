import React from "react";
import "./taskModalDataWorker.scss";
import { editMemberData, setNewMemberData } from "../../../firebase/apiSet";
import TextInput from "../../common/Inputs/TextInput";

class TaskModalDataWorker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSubmit: false,
      name: null,
      startDate: null,
      deadlineDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isValid = {
    name: null,
    startDate: null,
    deadlineDate: null,
  };


  componentDidMount() {
    if (this.props.taskData) {
      this.setState({
        name: this.props.taskData.name,
        startDate: this.props.taskData.startDate,
        deadlineDate: this.props.taskData.deadlineDate,
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      isSubmit: false
    });
  }

  handleRadioInput(event) {
    this.setState({
      sex: event.target.name
    });
  }


  handleValidInput = (input, status) => {

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

  handleSubmit(event) {

    event.preventDefault();

    if (this.state.isFormValid) {

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
    }

  }


  render() {

    return (
      <div className='modalData'>
        <form onSubmit={this.handleSubmit} className='userForm'>
          <ul className='userRegisterInputList'>

            <TextInput inputName='name' handleChange={this.handleChange} value={this.state.name}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
            <TextInput inputName='startDate' handleChange={this.handleChange} value={this.state.startDate}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
            <TextInput inputName='deadLineDate' handleChange={this.handleChange} value={this.state.deadlineDate}
                       handleValidInput={this.handleValidInput}
                       isSubmit={this.state.isSubmit} />
          </ul>

        </form>

        <div className='modalButtons'>
          <button className='submitButton' onClick={this.handleSubmit}>
            Save
          </button>
          <button className='submitButton' onClick={this.props.closeModal}>
            Return to grid
          </button>
        </div>
      </div>
    );
  }
}

export default TaskModalDataWorker;
