import faker from 'faker';
import db from './db';

export function setNewMemberData(data, id) {
  const userId = id || faker.fake('{{random.number}}');
  return db
    .collection('Users')
    .doc(userId)
    .set({ ...data, userId })
    .then(() => {
      console.log('Document successfully written!');
      return 'OK';
    })
    .catch(function(error) {
      console.log('Error writting document:', error);
    });
}

export function setTask(taskData, id) {
  const taskId = id || faker.fake('{{random.number}}');
  return db
    .collection('Tasks')
    .doc(taskId)
    .set({ ...taskData, taskId });
}

export function setTrack(trackData, id) {
  const taskTrackId = id || faker.fake('{{random.number}}');
  return db
    .collection('TaskTracks')
    .doc(taskTrackId)
    .set({ ...trackData, taskTrackId });
}

export function setTaskState(stateId, state) {
  return db
    .collection('TasksState')
    .doc(stateId)
    .set({ stateId, stateName: state });
}
