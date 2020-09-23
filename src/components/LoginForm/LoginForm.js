import React from "react";
import "./loginForm.scss";

function LoginForm(props) {

  return (
    <div className='loginForm'>
      <div className='loginFormBody'>
        <ul className='loginFormInputList'>
          <li><label htmlFor="">E-mail:</label><input type="text" /></li>
          <li><label htmlFor="">Password:</label><input type="password" /></li>
          <li><input type="submit" value='Login' className='loginButton'
                     onClick={props.handleLogin} /></li>
        </ul>
      </div>
    </div>
  );
}

export default LoginForm;
