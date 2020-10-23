import React from "react";
import "./header.scss";
import { Button } from "reactstrap";

import PropTypes from "prop-types";
import ThemeSwitcher from "./Toggle/ThemeSwitcher";


function Header({ isLogin, handleLogout, theme }) {
  return (

    <div className={`${theme} header`}>
      <div className="logoContainer">
        <img className="devIncubatorLogo" src="/assets/img/logo.png" alt="devIncubator" />
      </div>
      {isLogin &&
      <div className="buttonsContainer">
        <ThemeSwitcher />
        <Button outline color="secondary" className='logoutButton' onClick={handleLogout}>Logout</Button>
      </div>}
    </div>

  );
}

Header.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Header;
