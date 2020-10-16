import React from "react";
import "./sideBar.scss";
import { RoleContext } from "../../RoleContext";
import MembersPage from "../MembersPage/MembersPage";
import NavButton from "../common/Buttons/NavButton/NavButton";
import isAdminOrMentor from "../common/Conditions/isAdminOrMentor";

function SideBar() {

  return (
    <RoleContext.Consumer>
      {
        ({ role }) => {
          return (
            <div className='sideBar'>
              {isAdminOrMentor(role) &&
              <div>
                <NavButton label="Members" to='/app/members' className="navButton" color="secondary" />
                <NavButton label="Tasks" to='/app/tasks' className="navButton" color="secondary" />
              </div>}
            </div>
          );
        }}
    </RoleContext.Consumer>

  );
}

MembersPage.contextType = RoleContext;
export default SideBar;