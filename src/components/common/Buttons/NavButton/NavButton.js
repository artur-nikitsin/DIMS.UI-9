import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./navButton.scss";


function NavButton({ label, to, className, color }) {
  return (
    <NavLink to={to} activeClassName="active">
      <Button className={className} outline color={color}>
        {label}
      </Button>
    </NavLink>
  );
}

NavButton.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string
};
export default NavButton;
