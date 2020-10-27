function formValidator(inputsStatus) {
  const statusArr = Object.values(inputsStatus);
  const inValid = (element) => element === null || element === false;

  return !statusArr.some(inValid);
}

export default formValidator;
