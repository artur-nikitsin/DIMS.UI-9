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
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import MembersPage from "./components/MembersPage/MembersPage";
import Tasks from "./components/Tasks/Tasks";
import SideBar from "./components/Sidebar/SideBar";

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

    const { isLogin, role, signedUserId, signedUserName } = this.state;
    return (
      <BrowserRouter>
        <RoleContext.Provider value={{
          role: role,
          userId: signedUserId,
          signedUserName: signedUserName
        }}>
          <Route path='/'>
            <div className='App'>

              <Header handleLogout={this.handleLogout} isLogin={this.state.isLogin} />

              {isLogin ? <Redirect from='/' to='/app/members' /> :
                <Redirect from='/' to='/login' />}

              {signedUserId && <Redirect from='/' to={`/app/members/tasks_user=${signedUserId}`} />}

              <Route path='/app'>
                <AppContainer />
              </Route>

              <Route path='/login'>
                <LoginForm handleLogin={this.handleLogin} />
              </Route>

              <Footer />

            </div>
          </Route>
        </RoleContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
