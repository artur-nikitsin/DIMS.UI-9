import React from "react";
import "./sideBar.scss";

function SideBar({navigationButtons}) {

  return (
    <div className='sideBar'>
      {navigationButtons()}
    </div>
  );

}

export default SideBar;