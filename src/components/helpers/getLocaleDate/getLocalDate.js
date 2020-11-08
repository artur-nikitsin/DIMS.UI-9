function getLocaleDate(date, format) {
  return new Date(date).toLocaleDateString(format);
}

export default getLocaleDate;
