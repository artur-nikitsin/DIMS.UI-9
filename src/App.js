import React from "react";
import "./app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import AppContainer from "./components/AppContainer/AppContainer";
import Footer from "./components/Footer/Footer";
import LoginForm from "./components/LoginForm/LoginForm";
import Preloader from "./components/common/Preloader/Preloader";
import { RoleContext } from "./RoleContext";
import { DOCUMENT_TITLE } from "./components/constants/titles";
import FakerDB from "./components/helpers/faker/FakerDB";
import { logout, registerNewUser } from "./firebase/auth";

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      role: null,
      signedUserId: null,
      signedUserName: null,
      signedUserLastName: null
    };
  }

  componentDidMount() {
    document.title = DOCUMENT_TITLE;
  }

  handleLogin = ({ email, firstName, lastName, role, userId }) => {
    this.setState({
      isLogin: true,
      role: role,
      signedUserId: userId,
      signedUserName: firstName,
      signedUserLastName: lastName
    });
  };

  handleLogout = () => {
    this.setState({
      isLogin: false,
      role: null,
      signedUserId: null,
      signedUserName: null,
      signedUserLastName: null
    });
    logout().then(message => {
      console.log(message);
    });
  };


  render() {

    const { role, signedUserId, signedUserName } = this.state;
    return (
      <RoleContext.Provider value={{
        role: role,
        userId: signedUserId,
        signedUserName: signedUserName
      }}>
        <div className='App'>
          <Header handleLogout={this.handleLogout} isLogin={this.state.isLogin} />
          {this.state.isLogin ? <AppContainer /> : <LoginForm handleLogin={this.handleLogin} />}
          <Footer />
        </div>
      </RoleContext.Provider>
    );
  }
}

export default App;
