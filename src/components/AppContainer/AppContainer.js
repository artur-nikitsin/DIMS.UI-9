import React from "react";
import MembersPage from "../Members/MembersPage";
import Tasks from "../Tasks/Tasks";
import SideBar from "../Sidebar/SideBar";
import "../common/Styles/Mixins/Tables/commonTableStyles.scss";
import "./appContainer.scss";
import Header from "../Header/Header";
import { RoleContext } from "../../RoleContext";

class AppContainer extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      activePage: "members"
    };
  }

  showActivePage = (page) => {
    switch (page) {
      case "members":
        return <MembersPage />;
      case "tasks":
        return <Tasks />;
    }
  };

  handleShowActivePage = (page) => {
    this.setState({
      activePage: page
    });
  };

  navigationButtons = () => {
    return (
      <div>
        <button
          onClick={() => this.handleShowActivePage("members")}
          className={this.state.activePage === "members" ? "activeMembersButton" : "membersButton"}>
          Members
        </button>
        <button
          onClick={() => this.handleShowActivePage("tasks")}
          className={this.state.activePage === "tasks" ? "activeTasksTabButton" : "tasksTabButton"}>
          Tasks
        </button>
      </div>
    );
  };


  render() {

    return (

      <div className='appContainer'>
        <SideBar navigationButtons={this.navigationButtons} />
        <div className='pagesContainer'>{this.showActivePage(this.state.activePage)}</div>
      </div>

    );
  }
}

AppContainer.contextType = RoleContext;

export default AppContainer;

