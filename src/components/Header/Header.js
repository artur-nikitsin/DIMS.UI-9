import React from "react";
import "./header.scss";

function Header({ isLogin, handleLogout }) {
  return (
    <div className='header'>
      {isLogin && <button className='logoutButton' onClick={handleLogout}>Logout</button>}
    </div>
  );
}

export default Header;
