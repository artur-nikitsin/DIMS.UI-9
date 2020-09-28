import React from "react";
import MemberTasks from "../MembersTasks/MemberTasks";
import MemberTracks from "../MemberTracks/MemberTracks";
import "./membersProfile.scss";
import { RoleContext } from "../../RoleContext";

class MemberProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: "tasks"
    };
  }

  handleShowActivePage = (page) => () => {
    this.setState({
      activePage: page
    });
  };


  showActivePage = (page) => {
    return (
      page === "tasks" ?
        <MemberTasks
          userId={this.props.userId}
          userName={this.props.userName}
          navigationButtons={this.navigationButtons}
          handleReturnToFullList={this.props.handleReturnToFullList} />
        :
        <MemberTracks
          userId={this.props.userId}
          userName={this.props.userName}
          navigationButtons={this.navigationButtons}
          handleReturnToFullList={this.props.handleReturnToFullList} />
    );
  };

  navigationButtons = () => {

    let { role } = this.context;

    return (
      <div>
        {
          role === "admin" ? <button className='returnToFullListButton' onClick={this.props.handleReturnToFullList}>
            Return to full list
          </button> : null
        }
        <button
          onClick={this.handleShowActivePage("tasks")}
          className={`tasksButton ${this.state.activePage === "tasks" ? "active" : null}`}>
          Tasks
        </button>
        <button
          onClick={this.handleShowActivePage("taskTrack")}
          className={`tasksButton ${this.state.activePage === "taskTrack" ? "active" : null}`}>
          Task tracks
        </button>
      </div>
    );
  };

  render() {
    return <div className='memberProfile'>{this.showActivePage(this.state.activePage)}</div>;
  }
}

MemberProfile.contextType = RoleContext;
export default MemberProfile;
