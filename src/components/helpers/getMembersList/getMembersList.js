import { getMembers } from '../../../firebase/apiGet';

async function getMembersList() {
  const membersList = {};
  await getMembers().then((result) => {
    result.forEach((member) => {
      membersList[`${member.firstName} ${member.lastName}`] = member.userId;
    });
  });
  return membersList;
}

export default getMembersList;
