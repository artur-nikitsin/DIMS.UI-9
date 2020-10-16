import React from "react";
import "./buttons.scss";
import { Button } from "reactstrap";
import NavButton from "../../common/Buttons/NavButton/NavButton";
import isMentor from "../../common/Conditions/isMentor";


function Buttons({ role, toProgress, toTasks, handleProgress, handleTasks, handleEdit, handleDelete, userId }) {

  return (
    <div className='membersButtonsGroup'>
      <NavButton label="Progress" to={toProgress} color="secondary" className='progressMemberButton'
                 onClick={handleProgress} />
      <NavButton label="Tasks" to={toTasks} color="secondary" className='tasksMemberButton' onClick={handleTasks} />

      {isMentor(role) ||
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
