import React, { useState } from "react";
import "./AdaptHeader.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText, Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import NavButton from "../common/Buttons/NavButton/NavButton";
import ThemeSwitcher from "./Toggle/ThemeSwitcher";
import isAdminOrMentor from "../common/Conditions/isAdminOrMentor";

const AdaptHeader = ({ isLogin, handleLogout, theme, role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" className={`${theme} AdaptHeader`}>
        <NavbarBrand href="/" className="logoContainer"><img className="devIncubatorLogo" src="/assets/img/logo.png"
                                   alt="devIncubator" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {
              isAdminOrMentor(role) &&
              <NavItem className="navButtons">
                <NavButton label="Members" to='/app/members' className="navButton" color="secondary" />
                <NavButton label="Tasks" to='/app/tasks' className="navButton" color="secondary" />
              </NavItem>
            }
            {/* <NavItem>
              <NavButton label="Members" to='/app/members' className="navButton" color="secondary" />
            </NavItem>
            <NavItem>
              <NavButton label="Tasks" to='/app/tasks' className="navButton" color="secondary" />
            </NavItem>*/}
            {isLogin &&
            <div className="buttonsContainer">
              <ThemeSwitcher className="themeSwitcher"/>
              <Button outline color="secondary" className='logoutButton' onClick={handleLogout}>Logout</Button>
            </div>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};


export default AdaptHeader;