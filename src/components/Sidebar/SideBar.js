import React from "react";
import "./sideBar.scss";

function SideBar(props) {

  return (
    <div className='sideBar'>
      {props.navigationButtons()}
    </div>
  );

}

export default SideBar;