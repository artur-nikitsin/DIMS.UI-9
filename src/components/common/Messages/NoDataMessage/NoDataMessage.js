import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './noDataMessage.scss';
import { NavLink } from 'react-router-dom';

const NoDataMessage = ({ text, linkTo, linkText }) => {
  return (
    <Alert color='secondary' className='noDataMessage'>
      <p>
        <strong>{text}</strong>
      </p>
      <p>
        {linkTo && (
          <NavLink to={linkTo}>
            <FontAwesomeIcon size='sm' icon={faArrowLeft} className='linkIcon' />
            {linkText}
          </NavLink>
        )}
      </p>
    </Alert>
  );
};

NoDataMessage.propTypes = {
  text: PropTypes.string,
  linkTo: PropTypes.string,
  linkText: PropTypes.string,
};

NoDataMessage.defaultProps = {
  text: 'Nothing to show =(',
  linkTo: null,
  linkText: '',
};

export default NoDataMessage;
