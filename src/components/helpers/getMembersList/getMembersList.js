import { getMembers } from '../../../firebase/apiGet';

async function getMembersList() {
  return getMembers().then((result) => {
    return result.map((member) => {
      return { fullName: `${member.firstName} ${member.lastName}`, userId: member.userId };
    });
  });
}

export default getMembersList;
