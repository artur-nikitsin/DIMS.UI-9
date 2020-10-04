import React from "react";
import "./header.scss";
import { Button } from 'reactstrap';

function Header({ isLogin, handleLogout }) {
  return (
    <div className='header'>
      {isLogin && <Button outline color="secondary" className='logoutButton' onClick={handleLogout}>Logout</Button>}
    </div>
  );
}

export default Header;
