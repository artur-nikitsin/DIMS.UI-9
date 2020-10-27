import faker from 'faker';
import db from '../../../firebase/db';
import { registerNewUser } from '../../../firebase/auth';

function FakerDB(number) {
  const roles = db.collection('Roles');
  const adminId = '12345';
  const mentorId = '54321';

  roles.doc(adminId).set({
    firstName: 'Artur',
    lastName: 'Nikitsin',
    email: 'artur.nikitsin@gmail.com',
    role: 'admin',
  });

  roles.doc(mentorId).set({
    firstName: 'Jack',
    lastName: 'Daniels',
    email: 'jd@gmail.com',
    role: 'mentor',
  });

  registerNewUser('artur.nikitsin@gmail.com', '12345678').then((result) => {
    console.log(result);
  });
  registerNewUser('jd@gmail.com', '12345678').then((result) => {
    console.log(result);
  });

  db.collection('Users')
    .get()
    .then((users) => {
      if (users.docs.length <= number) {
        createData(number);
      }
    });

  const createData = (number) => {
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
            const firstName = faker.fake('{{name.firstName}}');
            const lastName = faker.fake('{{name.lastName}}');
            const email = faker.fake('{{internet.email}}');

            members.doc(userId).set({
              userId,
              directionId: i,
              firstName,
              email,
              lastName,
              sex: 'male',
              education: 'hight',
              birthDate: faker.fake('{{date.past}}'),
              university: faker.fake('{{company.companyName}}'),
              mathScore: faker.fake('{{random.number}}'),
              address: faker.fake('{{address.streetAddress}}'),
              mobilePhone: faker.fake('{{phone.phoneNumber}}'),
              skype: faker.fake('{{internet.userName}}'),
              startDate: faker.fake('{{date.past}}'),
            });

            roles.doc(userId).set({
              firstName,
              lastName,
              email,
              role: 'user',
              userId,
            });

            registerNewUser(email, '12345678').then((result) => {
              console.log(result);
            });
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error);
        });

      for (let i = 0; i <= 5; i++) {
        // create Tasks
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
                taskId,
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
              const stateId = faker.fake('{{random.number}}');
              setTaskState(stateId, 'Active');
              userTasks.doc(userTaskId).set({
                userTaskId,
                taskId,
                userId,
                stateId,
              });
            }
          })
          .catch(function(error) {
            console.log('Error getting document:', error);
          });

        // create TaskTrack

        for (let i = 0; i <= 5; i++) {
          const taskTrackId = faker.fake('{{random.number}}');
          const taskTracks = db.collection('TaskTracks');
          const taskTrack = db.collection('TaskTracks').doc(taskTrackId);

          taskTrack
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log('Document data:', doc.data());
              } else {
                taskTracks.doc(taskTrackId).set({
                  taskTrackId,
                  userTaskId,
                  trackDate: faker.fake('{{date.past}}'),
                  trackNote: faker.fake('{{lorem.paragraph}}'),
                });
              }
            })
            .catch((error) => {
              console.log('Error getting document:', error);
            });
        }
      }
    }
  };
}

export default FakerDB;
