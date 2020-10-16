import React from "react";
import "./sideBar.scss";
import { RoleContext } from "../../RoleContext";
import MembersPage from "../MembersPage/MembersPage";
import NavButton from "../common/Buttons/NavButton/NavButton";
import { Roles } from "../common/Maps/roles";

function SideBar() {

  return (
    <RoleContext.Consumer>{
      ({ role }) => {
        return (
          <div className='sideBar'>
            {(role === Roles.admin || role === Roles.mentor) &&
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