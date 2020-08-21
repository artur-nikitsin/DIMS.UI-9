import db from './db';

const api = {
  getMembers() {
    return db
      .collection('members')
      .get()
      .then((users) => {
        const members = users.docs.map((user) => {
          const { firstName, lastName, birthDate, directionId, education, startDate, userId } = user.data();
          return {
            firstName,
            lastName,
            birthDate,
            directionId,
            education,
            startDate,
            userId,
          };
        });
        return members;
      })
      .catch(({ message }) => ({ message, messageType: 'warning' }));
  },
};
export default api;
