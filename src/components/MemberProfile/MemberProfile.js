import React from "react";
import MemberTasks from "../MembersTasks/MemberTasks";
import MemberTracks from "../MemberTracks/MemberTracks";
import "./membersProfile.scss";
import { RoleContext } from "../../RoleContext";
import { Button } from "reactstrap";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MemberProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: "tasks",
      currentTask: null,
      currentTaskName: null
    };
  }

  handleShowActivePage = (page, trackId, taskName) => () => {

    this.setState({
      activePage: page,
      currentTask: trackId,
      currentTaskName: taskName
    });
  };


  showActivePage = (page) => {
    return (
      page === "tasks" ?
        <MemberTasks
          userId={this.props.userId}
          userName={this.props.userName}
          handleShowActivePage={this.handleShowActivePage}
          navigationButtons={this.navigationButtons}
          handleReturnToFullList={this.props.handleReturnToFullList} />
        :
        <MemberTracks
          taskId={this.state.currentTask}
          taskName={this.state.currentTaskName}
          userName={this.props.userName}
          navigationButtons={this.navigationButtons}
          handleReturnToFullList={this.props.handleReturnToFullList} />
    );
  };

  navigationButtons = () => {

    const { role } = this.context;
    const { activePage } = this.state;
    return (

      (role === "admin" || role === "mentor") ?

        <Button color="link" className="returnToMembersGrid" onClick={this.props.handleReturnToFullList}>
          <FontAwesomeIcon size="sm" icon={faArrowLeft} className="linkIcon" />
          Return to members manage grid
        </Button>
        :
        <Button color="link" className="returnToTasksGrid"
                onClick={this.handleShowActivePage("tasks")}>
          <FontAwesomeIcon size="sm" icon={faArrowLeft} className="linkIcon" />
          Return to task list
        </Button>


    );
  };

  render() {
    return <div className='memberProfile'>{this.showActivePage(this.state.activePage)}</div>;
  }
}

MemberProfile.contextType = RoleContext;
export default MemberProfile;
