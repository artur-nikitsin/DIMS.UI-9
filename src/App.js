import React from "react";
import "./app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import AppContainer from "./components/AppContainer/AppContainer";
import Footer from "./components/Footer/Footer";
import LoginForm from "./components/LoginForm/LoginForm";
import { RoleContext } from "./contexts/RoleContext";
import { ThemeContext } from "./contexts/ThemeContext";
import { DOCUMENT_TITLE } from "./components/constants/titles";
import { logout, registerNewUser } from "./firebase/auth";
import { Route, Redirect, Switch } from "react-router-dom";
import getUserFromSessionStorage from "./components/helpers/sessionStorage/getUserFromSessionStorage";
import setUserToSessionStorage from "./components/helpers/sessionStorage/setUserToSessionStorage";
import deleteUserFromLocalStorage from "./components/helpers/sessionStorage/deleteUserFromLocalStorage";
import Preloader from "./components/common/Preloader/Preloader";


class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
      isLogin: false,
      fromLogin: false,
      role: null,
      signedUserId: null,
      signedUserName: null,
      signedUserLastName: null,
      userData: getUserFromSessionStorage()
    };
  }

  componentDidMount() {
    if (getUserFromSessionStorage()) {
      const { firstName, lastName, role, userId } = getUserFromSessionStorage();
      this.setState({
        isLogin: true,
        fromLoginForm: false,
        role: role,
        signedUserId: userId,
        signedUserName: firstName,
        signedUserLastName: lastName,
        userData: { firstName, lastName, role, userId }
      });
    }
    document.title = DOCUMENT_TITLE;
  }

  handleLogin = ({ firstName, lastName, role, userId }) => {
    this.setState({
      isLogin: true,
      fromLoginForm: true,
      role: role,
      signedUserId: userId,
      signedUserName: firstName,
      signedUserLastName: lastName,
      userData: { firstName, lastName, role, userId }
    });

    setUserToSessionStorage({
      role: role,
      userId: userId,
      firstName: firstName,
      lastName: lastName
    });
  };

  handleLogout = () => {
    this.setState({
      theme: "light",
      isLogin: false,
      fromLoginForm: false,
      role: null,
      signedUserId: null,
      signedUserName: null,
      signedUserLastName: null,
      userData: null
    });
    deleteUserFromLocalStorage();
    logout().then(message => {
      console.log(message);
    });
  };


  onSwitchTheme = (theme) => {
    this.setState({ theme });
  };


  render() {

    const { theme, isLogin, fromLoginForm, role, signedUserId, signedUserName, userData } = this.state;

    return (
      <RoleContext.Provider value={{
        role: role,
        userId: signedUserId,
        signedUserName: signedUserName
      }}>
        <ThemeContext.Provider value={{ theme, onSwitchTheme: this.onSwitchTheme }}>
          <Switch>
            <>
              <div className='App'>
                <Header handleLogout={this.handleLogout} isLogin={isLogin} />
                {fromLoginForm && <Redirect to='/app/members' />}
                {!userData && <Redirect to='/login' />}
                {signedUserId && fromLoginForm && <Redirect from='/' to={`/app/members/tasks_user=${signedUserId}`} />}

                <Route path='/app' component={AppContainer} />

                <Route path='/login'>
                  <LoginForm handleLogin={this.handleLogin} />
                </Route>

                <Footer />
              </div>
            </>
          </Switch>

        </ThemeContext.Provider>
      </RoleContext.Provider>

    );
  }
}

export default App;
