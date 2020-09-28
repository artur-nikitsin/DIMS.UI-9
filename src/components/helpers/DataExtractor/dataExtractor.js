function dataExtractor(dataStore) {

  let dataToSend = {};
  for (let input in dataStore) {
    if (dataStore[input]) {
      dataToSend[input] = dataStore[input].data;
    }
  }
  return dataToSend;
}

export default dataExtractor;