import React from "react";
import "./header.scss";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import MembersPage from "../MembersPage/MembersPage";
import { RoleContext } from "../../RoleContext";


function Header({ isLogin }) {

  return (
    <RoleContext.Consumer>{({ handleLogout }) => (
      <div className='header'>
        <div className="logoContainer">
          <img className="devIncubatorLogo" src="/assets/img/logo.png" alt="devIncubator" />
        </div>
        {isLogin && <Button outline color="secondary" className='logoutButton' onClick={handleLogout}>Logout</Button>}
      </div>
    )}

    </RoleContext.Consumer>
  );
}

Header.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};


export default Header;
