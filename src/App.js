import React from "react";
import "./app.scss";
import Header from "./components/Header/Header";
import AppContainer from "./components/AppContainer/AppContainer";
import Footer from "./components/Footer/Footer";
import LoginForm from "./components/LoginForm/LoginForm";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
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

  render() {
    return (
      <div className='App'>
        <Header handleLogout={this.handleLogout} isLogin={this.state.isLogin} />
        {this.state.isLogin ? <AppContainer /> : <LoginForm handleLogin={this.handleLogin} />}
        <Footer />
      </div>
    );
  };
}


export default App;
