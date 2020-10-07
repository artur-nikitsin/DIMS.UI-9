import React from "react";
import MembersPage from "../MembersPage/MembersPage";
import Tasks from "../Tasks/Tasks";
import SideBar from "../Sidebar/SideBar";
import "../common/Styles/Mixins/Tables/commonTableStyles.scss";
import "./appContainer.scss";
import { RoleContext } from "../../RoleContext";
import { Button } from "reactstrap";

class AppContainer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      activePage: "members"
    };
  }

  showActivePage = (page) => {
    return (page === "members" ? <MembersPage /> : <Tasks />);
  };

  handleShowActivePage = (page) => () => {
    this.setState({
      activePage: page
    });
  };

  navigationButtons = () => {
    const { activePage } = this.state;
    return (
      <div className="navigationButtons">
        <Button outline color="secondary"
                onClick={this.handleShowActivePage("members")}
                className={`membersButton ${activePage === "members" ? "active" : null}`}>
          Members
        </Button>
        <Button outline color="secondary"
                onClick={this.handleShowActivePage("tasks")}
                className={`tasksTabButton ${activePage === "tasks" ? "active" : null}`}>
          Tasks
        </Button>
      </div>
    );
  };


  render() {
    const { activePage } = this.state;
    return (
      <div className='appContainer'>
        <SideBar navigationButtons={this.navigationButtons} />
        <div className='pagesContainer'>{this.showActivePage(activePage)}</div>
      </div>
    );
  }
}


AppContainer.contextType = RoleContext;
export default AppContainer;

