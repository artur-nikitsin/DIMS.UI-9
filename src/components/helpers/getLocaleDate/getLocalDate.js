function getLocaleDate(date) {
  return new Date(date).toLocaleDateString('fr-CA');
}

export default getLocaleDate;
