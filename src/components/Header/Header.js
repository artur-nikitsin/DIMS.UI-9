import React from "react";
import "./header.scss";
import { Button } from "reactstrap";
import PropTypes from "prop-types";


function Header({ isLogin, handleLogout }) {
  return (
    <div className='header'>
      <div className="logoContainer">
        <img className="devIncubatorLogo" src="/assets/img/logo.png" alt="devIncubator" />
      </div>
      {isLogin && <Button outline color="secondary" className='logoutButton' onClick={handleLogout}>Logout</Button>}
    </div>
  );
}

Header.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
export default Header;
