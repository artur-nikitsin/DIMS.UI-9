import React from "react";
import "./footer.scss";
import { FOOTER_TITLE } from "../constants/titles";

function Footer() {
  return <div className='footer'>
    <p className='allRights'>{FOOTER_TITLE}</p>
  </div>;
}

export default Footer;
