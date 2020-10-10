import React from "react";
import "./header.scss";
import { Button } from "reactstrap";

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

export default Header;
