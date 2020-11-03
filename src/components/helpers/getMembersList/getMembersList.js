import { getMembers } from '../../../firebase/apiGet';

async function getMembersList() {
  await getMembers().then((result) => {
    return result.map((member) => {
      return { [`${member.firstName} ${member.lastName}`]: member.userId };
    });
  });
}

export default getMembersList;
