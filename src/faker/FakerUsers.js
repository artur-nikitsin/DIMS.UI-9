import faker from 'faker';
import db from '../firebase/db';

const FakerUsers = {
  create(number) {
    db.collection('members')
      .get()
      .then((users) => {
        if (users.docs.length <= number) {
          createUsers();
        }
      });

    let date = new Date(faker.fake('{{date.past}}'));
    console.log(new Date(faker.fake('{{date.past}}')).toLocaleDateString());

    const createUsers = () => {
      for (let i = 0; i <= number; i++) {
        const dbId = faker.fake('{{date.past}}');

        let members = db.collection('members');
        let member = db.collection('members').doc(dbId);

        member
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log('Document data:', doc.data());
            } else {
              members.doc(dbId).set({
                userId: dbId,
                directionId: i,
                firstName: faker.fake('{{name.firstName}}'),
                email: faker.fake('{{internet.email}}'),
                lastName: faker.fake('{{name.lastName}}'),
                sex: 'male',
                education: 'hight',
                birthDate: faker.fake('{{date.past}}'),
                university: faker.fake('{{company.companyName}}'),
                mathScore: faker.fake('{{random.number}}'),
                adress: faker.fake('{{address.streetAddress}}'),
                mobilePhone: faker.fake('{{phone.phoneNumber}}'),
                skype: faker.fake('{{internet.userName}}'),
                startDate: faker.fake('{{date.past}}'),
              });
            }
          })
          .catch(function(error) {
            console.log('Error getting document:', error);
          });
      }
    };
  },
};
export default FakerUsers;
