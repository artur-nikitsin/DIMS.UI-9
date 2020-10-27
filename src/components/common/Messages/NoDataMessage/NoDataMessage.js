import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NoDataMessage = ({ backLink }) => {
  return (
    <Alert color='dark'>
      Nothing to show.
      {backLink}
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
