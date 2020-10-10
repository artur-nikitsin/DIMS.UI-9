import React from "react";
import MembersPage from "../MembersPage/MembersPage";
import Tasks from "../Tasks/Tasks";
import SideBar from "../Sidebar/SideBar";
import "../common/Styles/Mixins/Tables/commonTableStyles.scss";
import "./appContainer.scss";
import PropTypes from "prop-types";
import { RoleContext } from "../../RoleContext";
import { Route, Switch } from "react-router-dom";
import MemberTasks from "../MembersTasks/MemberTasks";

class AppContainer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {

    return (
      <div className='appContainer'>
        <SideBar />
        <div className="pagesContainer">
          <Switch>
            <Route path='/app/members' component={MembersPage} />

            <Route path='/app/tasks' component={Tasks} />
          </Switch>
        </div>
      </div>
    );
  }
}


AppContainer.contextType = RoleContext;
export default AppContainer;