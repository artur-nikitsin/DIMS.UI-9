import React from "react";
import "./buttons.scss";
import { Button } from "reactstrap";
import { NavLink, NavButton, Redirect, Route } from "react-router-dom";


function Buttons({ role, toProgress, toTasks, handleProgress, handleTasks, handleEdit, handleDelete, userId }) {


  return (
    <div className='membersButtonsGroup'>
      <NavLink to={toProgress}>
        <Button outline color="secondary" className='progressMemberButton' id={userId}
                onClick={handleProgress}>
          Progress
        </Button>
      </NavLink>
      <NavLink to={toTasks}>
        <Button outline color="secondary" className='tasksMemberButton' id={userId}
                onClick={handleTasks}>
          Tasks
        </Button>
      </NavLink>
      {role === "mentor" ||

      <div>
        <Button outline color="secondary" className='editMemberButton' id={userId}
                onClick={handleEdit}>
          Edit
        </Button>
        <Button outline color="danger" className='deleteMemberButton' id={userId}
                onClick={handleDelete}>
          Delete
        </Button>
      </div>
      }
    </div>
  );
}

export default Buttons;
