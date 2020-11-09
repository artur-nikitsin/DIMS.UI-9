import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import './noDataMessage.scss';
import ReturnLink from '../../ReturnLink/ReturnLink';

const NoDataMessage = ({ text, linkTo, linkText }) => {
  return (
    <Alert color='secondary' className='noDataMessage'>
      <p>
        <strong>{text}</strong>
      </p>
      <p>{linkTo && <ReturnLink to={linkTo} text={linkText} />}</p>
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
