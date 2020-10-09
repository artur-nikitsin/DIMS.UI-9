import React from "react";
import MembersPage from "../MembersPage/MembersPage";
import Tasks from "../Tasks/Tasks";
import SideBar from "../Sidebar/SideBar";
import "../common/Styles/Mixins/Tables/commonTableStyles.scss";
import "./appContainer.scss";
import { RoleContext } from "../../RoleContext";
import { Route } from "react-router-dom";

class AppContainer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div className='appContainer'>
        <SideBar />

        <Route path='/app/members'>
          <MembersPage />
        </Route>

        <Route path='/app/tasks'>
          <Tasks />
        </Route>

      </div>
    );
  }
}


AppContainer.contextType = RoleContext;
export default AppContainer;