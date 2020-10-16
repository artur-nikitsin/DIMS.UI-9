import { Roles } from "../Maps/roles";

const isMentor = (role) => {
  return (role === Roles.mentor);
};
export default isMentor;