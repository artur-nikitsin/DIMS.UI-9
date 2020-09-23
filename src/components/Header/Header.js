import React from "react";
import "./header.scss";

function Header(props) {
  return (
    <div className='header'>
      {props.isLogin ? <button className='logoutButton' onClick={props.handleLogout}>Logout</button> : null}
    </div>
  );
}

export default Header;
