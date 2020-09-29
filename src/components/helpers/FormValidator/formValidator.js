function formValidator(inputsValidStatus) {
  let statusArr = [];


  for (let input in inputsValidStatus) {
    if (inputsValidStatus[input]) {
      statusArr.push(inputsValidStatus[input].isValid);
    }
  }
  return !statusArr.includes(false);
}

export default formValidator;