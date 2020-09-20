import React from "react";

function getLocaleDate(date) {
  return (new Date(date).toLocaleDateString());
}

export default getLocaleDate;







