import React from 'react';
import './spiner.scss';

function Spinner() {
  return (
    <div className='preloader'>
      <div className='one' />
      <div className='two' />
      <div className='three' />
    </div>
  );
}

export default Spinner;
