function lengthValidator(data) {

  if (data.length > 2) {
    return (
      {
        isValid: true,
        status: "valid",
        message: ""
      }
    );
  } else {
    return (
      {
        isValid: false,
        status: "invalid",
        message: "Its must contains more symbols!"
      }
    );
  }
}


export default lengthValidator;