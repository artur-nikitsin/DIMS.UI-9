function formValidator(inputsStatus) {

  const statusArr = Object.values(inputsStatus);

  return !statusArr.includes(false || null);
}

export default formValidator;