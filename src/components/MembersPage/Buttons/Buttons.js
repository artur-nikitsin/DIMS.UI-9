import React from "react";
import "./buttons.scss";
import { Button } from "reactstrap";

function Buttons({ role, handleProgress, handleTasks, handleEdit, handleDelete, userId }) {


  return (
    <div className='membersButtonsGroup'>
      <Button outline color="secondary" className='progressMemberButton' id={userId}
              onClick={handleProgress}>
        Progress
      </Button>
      <Button outline color="secondary" className='tasksMemberButton' id={userId}
              onClick={handleTasks}>
        Tasks
      </Button>

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
