import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const NoDataMessage = ({ backLink }) => {
  return (
    <Alert color='dark'>
      <p>
        <strong>Nothing to show =(</strong>
      </p>
      <p>
        {' '}
        <FontAwesomeIcon size='sm' icon={faArrowLeft} className='linkIcon' />
        {backLink}
      </p>
    </Alert>
  );
};

NoDataMessage.propTypes = {
  backLink: PropTypes.elementType,
};

NoDataMessage.defaultProps = {
  backLink: <NavLink to='/users'> Return to members manage grid</NavLink>,
};

export default NoDataMessage;
