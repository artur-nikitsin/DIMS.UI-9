import React from "react";
import MembersPage from "../MembersPage/MembersPage";
import Tasks from "../Tasks/Tasks";
import SideBar from "../Sidebar/SideBar";
import "../common/Styles/Mixins/Tables/commonTableStyles.scss";
import "./appContainer.scss";
import { RoleContext } from "../../contexts/RoleContext";
import { Route, Switch } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";


class AppContainer extends React.PureComponent {

  render() {
    return (
      <RoleContext.Consumer>
        {({ role, signedUserId, signedUserName }) => (
          <ThemeContext.Consumer>
            {({ theme }) => (
              <div className={`${theme} appContainer`}>
                <SideBar />
                <div className="pagesContainer">
                  <Switch>

                    <Route exact  path={"/app/members"}
                           render={(props) =>
                             <MembersPage
                               role={role}
                               theme={theme}
                               signedUserId={signedUserId}
                               signedUserName={signedUserName}
                               {...props} />}>
                    </Route>

                    <Route path='/app/tasks' component={Tasks} />
                  </Switch>
                </div>
              </div>
            )}
          </ThemeContext.Consumer>
        )}
      </RoleContext.Consumer>

    );
  }
}

export default AppContainer;