import React from "react";
import "./sideBar.scss";
import { RoleContext } from "../../RoleContext";
import MembersPage from "../MembersPage/MembersPage";

function SideBar({ navigationButtons }) {

  return (
    <RoleContext.Consumer>{
      ({ role }) => {
        return (
          <div className='sideBar'>
            {(role === "admin" || role === "mentor") && navigationButtons()}
          </div>
        );
      }}
    </RoleContext.Consumer>

  );
}

MembersPage.contextType = RoleContext;
export default SideBar;