import React from 'react';


function getSubString(string, length) {
  return (string.substr(0, length) + '...');
}

export default getSubString;