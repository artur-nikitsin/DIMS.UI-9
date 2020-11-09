import faker from 'faker';
import db from '../../../firebase/db';
import { register, setUserRole } from '../../../firebase/auth';
import { setTask, setTaskState } from '../../../firebase/apiSet';
import { setNewMemberData } from '../../../firebase/apiSet';

function FakerDB(number) {
  const admin = {
    firstName: 'Artur',
    lastName: 'Nikitsin',
    email: 'artur.nikitsin@gmail.com',
    role: 'admin',
    userId: '12345',
  };

  const mentor = {
    firstName: 'Jack',
    lastName: 'Daniels',
    email: 'jd@gmail.com',
    role: 'mentor',
    userId: '54321',
  };

  setUserRole(admin);
  setUserRole(mentor);
  register('artur.nikitsin@gmail.com', '12345678').then((result) => {
    console.log(result);
  });
  register('jd@gmail.com', '12345678').then((result) => {
    console.log(result);
  });

  const createData = async (number) => {
    for (let i = 0; i <= number; i++) {
      // create Users
      const userId = faker.fake('{{random.number}}');
      const members = db.collection('Users');
      const member = db.collection('Users').doc(userId);

      await member
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
          } else {
            const firstName = faker.fake('{{name.firstName}}');
            const lastName = faker.fake('{{name.lastName}}');
            const email = faker.fake('{{internet.email}}');
            const userData = {
              directionId: '001',
              firstName,
              email,
              lastName,
              sex: 'male',
              education: 'hight',
              birthDate: faker.date.between('1990-01-01', '2001-12-31').toString(),
              university: faker.fake('{{company.companyName}}'),
              mathScore: faker.fake('{{random.number}}'),
              address: faker.fake('{{address.streetAddress}}'),
              mobilePhone: faker.fake('{{phone.phoneNumber}}'),
              skype: faker.fake('{{internet.userName}}'),
              startDate: faker.fake('{{date.past}}'),
            };
            setNewMemberData(userData, userId);
            setUserRole({
              firstName,
              lastName,
              email,
              role: 'user',
              userId,
            });
            register(email, '12345678').then((result) => {
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

        await task
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log('Document data:', doc.data());
            } else {
              const task = {
                name: faker.fake('{{name.title}}'),
                description: faker.fake('{{lorem.paragraph}}'),
                startDate: faker.fake('{{date.recent}}'),
                deadlineDate: faker.fake('{{date.future}}'),
              };
              setTask(task, taskId);
            }
          })
          .catch(function(error) {
            console.log('Error getting document:', error);
          });

        // createUserTasks
        const userTaskId = faker.fake('{{random.number}}');
        const userTasks = db.collection('UserTasks');
        const userTask = db.collection('UserTasks').doc(userTaskId);

        await userTask
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

          await taskTrack
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
  createData(number);
}

export default FakerDB;
