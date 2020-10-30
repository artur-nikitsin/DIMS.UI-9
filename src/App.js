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
import Header from './components/Header/Header';
import MembersPage from './components/MembersPage/MembersPage';
import Tasks from './components/Tasks/Tasks';
import MemberProgress from './components/MemberProgress/MemberProgress';
import MemberTasks from './components/MembersTasks/MemberTasks';

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
      handleLogin: this.handleLogin,
      onSwitchTheme: this.onSwitchTheme,
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
    const { theme, isLogin, fromLoginForm, role, signedUserId, signedUserName, userData } = this.state;

    return (
      <RoleContext.Provider value={this.state}>
        <ThemeContext.Provider value={this.state}>
          <Switch>
            <>
              <div className={`${theme} App`}>
                <Header
                  handleLogout={this.handleLogout}
                  isLogin={isLogin}
                  theme={theme}
                  role={role}
                  onSwitchTheme={this.onSwitchTheme}
                />

                {fromLoginForm && <Redirect to='/users' />}
                {!userData && <Redirect to='/login' />}
                {signedUserId && fromLoginForm && <Redirect from='/' to={`/users/${signedUserId}/tasks`} />}

                <Route
                  exact
                  path='/users'
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

                <Route path='/users/:userId/progress' render={(props) => <MemberProgress {...props} />} />

                <Route
                  path='/users/:userId/tasks'
                  render={(props) => (
                    <MemberTasks role={role} userId={signedUserId} signedUserName={signedUserName} {...props} />
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
