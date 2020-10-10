const deleteUserFromLocalStorage = () => {
  sessionStorage.removeItem("user");
};

export default deleteUserFromLocalStorage;