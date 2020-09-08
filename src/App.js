import React from 'react';
import './app.scss';
import Header from './components/Header/Header';
import PagesContainer from './components/PagesContainer/PagesContainer';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <PagesContainer />
      <Footer />
    </div>
  );
};

export default App;
