import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ path }) => {
  return <img className='devIncubatorLogo' src={path} alt='devIncubator' />;
};

Logo.propTypes = {
  path: PropTypes.string,
};

Logo.defaultProps = {
  path: '/assets/img/logo.png',
};
export default Logo;
