import { getMembers } from '../../../firebase/apiGet';

async function getMembersList() {
  const membersList = {};
  membersList['-choose-'] = null;
  await getMembers().then((result) => {
    result.forEach((member) => {
      membersList[`${member.firstName} ${member.lastName}`] = member.userId;
    });
  });
  return membersList;
}

export default getMembersList;
