const getNestedObjectValues = (object, nestedKey, newValue) => {
  let objectWithNestedKeys = {};
  const objectKeys = Object.keys(object);
  objectKeys.forEach((key) => {
    objectWithNestedKeys = { ...objectWithNestedKeys, [key]: nestedKey ? object[key][nestedKey] : newValue };
  });
  return objectWithNestedKeys;
};
export default getNestedObjectValues;
