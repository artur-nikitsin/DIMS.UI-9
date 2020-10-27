import { Roles } from '../Maps/roles';

const isAdminOrMentor = (role) => {
  return role === Roles.admin || role === Roles.mentor;
};
export default isAdminOrMentor;
