import React from "react";
import MembersPage from "../MembersPage/MembersPage";
import Tasks from "../Tasks/Tasks";
import SideBar from "../Sidebar/SideBar";
import "../common/Styles/Mixins/Tables/commonTableStyles.scss";
import "./appContainer.scss";
import Header from "../Header/Header";
import { RoleContext } from "../../RoleContext";


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
    return (
      <div>
        <button
          onClick={this.handleShowActivePage("members")}
          className={`membersButton ${this.state.activePage === "members" ? "active" : null}`}>
          Members
        </button>
        <button
          onClick={this.handleShowActivePage("tasks")}
          className={`tasksTabButton ${this.state.activePage === "tasks" ? "active" : null}`}>
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

