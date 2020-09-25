import React from "react";
import "./loginForm.scss";
import TextInput from "../common/Inputs/TextInput";

function LoginForm({ handleLogin }) {

  return (
    <div className='loginForm'>
      <div className='loginFormBody'>
        <ul className='loginFormInputList'>
          <TextInput inputName="email" value=""/>
          <TextInput inputName="password" value=""/>
        {/*  <li><label htmlFor="">E-mail:</label><input type="text" /></li>
          <li><label htmlFor="">Password:</label><input type="password" /></li>*/}
          <li><input type="submit" value='Login' className='loginButton'
                     onClick={handleLogin} /></li>
        </ul>
      </div>
    </div>
  );
}

export default LoginForm;
