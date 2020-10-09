import React from "react";
import "./sideBar.scss";
import { RoleContext } from "../../RoleContext";
import MembersPage from "../MembersPage/MembersPage";
import { NavLink } from "react-router-dom";

function SideBar({ navigationButtons }) {

  return (
    <RoleContext.Consumer>{
      ({ role }) => {
        return (
          <div className='sideBar'>
            {(role === "admin" || role === "mentor") &&
            <div>
              <NavLink to='/app/members'>
                Members
              </NavLink>
              <NavLink to='/app/tasks'>
                Tasks
              </NavLink>
            </div>}
          </div>
        );
      }}
    </RoleContext.Consumer>

  );
}

MembersPage.contextType = RoleContext;
export default SideBar;