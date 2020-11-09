import { NavLink } from 'react-router-dom';
import React from 'react';
import './returnLink.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ReturnLink = ({ to, text }) => {
  return (
    <NavLink className='returnLink' to={to}>
      <FontAwesomeIcon size='sm' icon={faArrowLeft} className='linkIcon' /> {text}
    </NavLink>
  );
};
export default ReturnLink;
