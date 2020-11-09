const getAge = (birthDay) => {
  return new Date().getFullYear() - new Date(birthDay).getFullYear();
};

export default getAge;
