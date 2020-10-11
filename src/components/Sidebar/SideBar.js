import React from "react";
import "./sideBar.scss";
import { RoleContext } from "../../RoleContext";
import MembersPage from "../MembersPage/MembersPage";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";

function SideBar() {

  return (
    <RoleContext.Consumer>{
      ({ role }) => {
        return (
          <div className='sideBar'>
            {(role === "admin" || role === "mentor") &&
            <div>

              <NavLink to='/app/members' activeClassName="active">
                <Button className="navButton" outline color="secondary">
                  Members
                </Button>
              </NavLink>

              <NavLink to='/app/tasks' activeClassName="active">
                <Button className="navButton" outline color="secondary">
                  Tasks
                </Button>
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