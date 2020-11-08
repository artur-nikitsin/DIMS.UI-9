const getDirectionName = (directions, id) => {
  let directionName = '';
  directions.forEach((direction) => {
    const { directionId, name } = direction;
    if (directionId === id) directionName = name;
  });
  return directionName;
};
export default getDirectionName;
