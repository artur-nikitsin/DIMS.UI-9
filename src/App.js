import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PagesContainer from './components/PagesContainer/PagesContainer';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <PagesContainer />
      {/*  <Footer />*/}
    </div>
  );
};

export default App;
