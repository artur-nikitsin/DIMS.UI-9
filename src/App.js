import React from 'react';
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import LoginForm from './components/LoginForm/LoginForm';
import { RoleContext } from './contexts/RoleContext';
import { ThemeContext } from './contexts/ThemeContext';
import { DOCUMENT_TITLE } from './components/constants/titles';
import { logout } from './firebase/auth';
import getUserFromSessionStorage from './components/helpers/sessionStorage/getUserFromSessionStorage';
import setUserToSessionStorage from './components/helpers/sessionStorage/setUserToSessionStorage';
import deleteUserFromLocalStorage from './components/helpers/sessionStorage/deleteUserFromLocalStorage';
import AdaptHeader from './components/Header/AdaptHeader';
import MembersPage from './components/MembersPage/MembersPage';
import Tasks from './components/Tasks/Tasks';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
      isLogin: false,
      fromLoginForm: false,
      role: null,
      signedUserId: null,
      signedUserName: null,
      signedUserLastName: null,
      userData: getUserFromSessionStorage(),
    };
  }

  componentDidMount() {
    if (getUserFromSessionStorage()) {
      const { firstName, lastName, role, userId } = getUserFromSessionStorage();
      this.setState({
        isLogin: true,
        fromLoginForm: false,
        role,
        signedUserId: userId,
        signedUserName: firstName,
        signedUserLastName: lastName,
        userData: { firstName, lastName, role, userId },
      });
    }
    document.title = DOCUMENT_TITLE;
  }

  handleLogin = ({ firstName, lastName, role, userId }) => {
    this.setState({
      isLogin: true,
      fromLoginForm: true,
      role,
      signedUserId: userId,
      signedUserName: firstName,
      signedUserLastName: lastName,
      userData: { firstName, lastName, role, userId },
    });

    setUserToSessionStorage({
      role,
      userId,
      firstName,
      lastName,
    });
  };

  handleLogout = () => {
    this.setState({
      theme: 'light',
      isLogin: false,
      fromLoginForm: false,
      role: null,
      signedUserId: null,
      signedUserName: null,
      signedUserLastName: null,
      userData: null,
    });
    deleteUserFromLocalStorage();
    logout().then((message) => {
      console.log(message);
    });
  };

  onSwitchTheme = (theme) => {
    this.setState({ theme });
  };

  render() {
    const {
      theme,
      isLogin,
      fromLoginForm,
      role,
      signedUserId,
      signedUserName,
      signedUserLastName,
      userData,
    } = this.state;

    return (
      <RoleContext.Provider
        value={{
          role,
          userId: signedUserId,
          signedUserName,
          signedUserLastName,
          handleLogin: this.handleLogin,
        }}
      >
        <ThemeContext.Provider value={{ theme, onSwitchTheme: this.onSwitchTheme }}>
          <Switch>
            <>
              <div className={`${theme} App`}>
                <AdaptHeader handleLogout={this.handleLogout} isLogin={isLogin} theme={theme} role={role} />

                {fromLoginForm && <Redirect to='/members' />}
                {!userData && <Redirect to='/login' />}
                {signedUserId && fromLoginForm && <Redirect from='/' to={`/members/tasks-user/${signedUserId}`} />}

                <Route
                  path='/members'
                  render={(props) => (
                    <MembersPage
                      role={role}
                      theme={theme}
                      signedUserId={signedUserId}
                      signedUserName={signedUserName}
                      {...props}
                    />
                  )}
                />
                <Route path='/tasks' component={Tasks} />
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
