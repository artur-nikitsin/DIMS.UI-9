import faker from 'faker';
import db from '../firebase/db';

const FakerDB = {
  create(number) {
    db.collection('Users')
      .get()
      .then((users) => {
        if (users.docs.length <= number) {
          createData();
        }
      });

    const createData = () => {
      for (let i = 0; i <= number; i++) {
        // create Users
        const userId = faker.fake('{{random.number}}');
        const members = db.collection('Users');
        const member = db.collection('Users').doc(userId);

        member
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log('Document data:', doc.data());
            } else {
              members.doc(userId).set({
                userId: userId,
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

        //create Tasks
        for (let i = 0; i <= 5; i++) {
          const taskId = faker.fake('{{random.number}}');
          const tasks = db.collection('Tasks');
          const task = db.collection('Tasks').doc(taskId);

          task
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log('Document data:', doc.data());
              } else {
                tasks.doc(taskId).set({
                  name: faker.fake('{{name.title}}'),
                  description: faker.fake('{{lorem.paragraph}}'),
                  startDate: faker.fake('{{date.future}}'),
                  deadlineDate: faker.fake('{{date.future}}'),
                });
              }
            })
            .catch(function(error) {
              console.log('Error getting document:', error);
            });

          // createUserTasks
          const userTaskId = faker.fake('{{random.number}}');
          const userTasks = db.collection('UserTasks');
          const userTask = db.collection('UserTasks').doc(userTaskId);

          userTask
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log('Document data:', doc.data());
              } else {
                userTasks.doc(userTaskId).set({
                  userTaskId: faker.fake('{{random.number}}'),
                  taskId: taskId,
                  userId: userId,
                  stateId: '2',
                });
              }
            })
            .catch(function(error) {
              console.log('Error getting document:', error);
            });
        }
      }
    };
  },
};
export default FakerDB;
