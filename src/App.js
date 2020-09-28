import React from "react";
import "./app.scss";
import Header from "./components/Header/Header";
import AppContainer from "./components/AppContainer/AppContainer";
import Footer from "./components/Footer/Footer";
import LoginForm from "./components/LoginForm/LoginForm";
import Preloader from "./components/common/Preloader/Preloader";
import { RoleContext } from "./RoleContext";
import { DOCUMENT_TITLE } from "./components/constants/titles";


class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      role: "admin",
      signedUser: "2718",
      signedUserName: "Archie"
    };
  }

  componentDidMount() {
    document.title = DOCUMENT_TITLE;
  }

  handleLogin = () => {
    this.setState({
      isLogin: true
    });
  };

  handleLogout = () => {
    this.setState({
      isLogin: false
    });
  };


  changeContextUser = () => {
    this.setState({
      role: "user"
    });
  };

  changeContextAdmin = () => {
    this.setState({
      role: "admin"
    });
  };


  render() {
    return (
      <RoleContext.Provider value={{
        role: this.state.role,
        userId: this.state.signedUser,
        signedUserName: this.state.signedUserName
      }}>
        <button onClick={this.changeContextUser}>User</button>
        <button onClick={this.changeContextAdmin}>Admin</button>
        <div className='App'>
          <Header handleLogout={this.handleLogout} isLogin={this.state.isLogin} />
          {this.state.isLogin ? <AppContainer /> : <LoginForm handleLogin={this.handleLogin} />}
          <Footer />
        </div>
      </RoleContext.Provider>
    );
  };
}

export default App;
