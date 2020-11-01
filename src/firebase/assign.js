import faker from 'faker';
import db from './db';
import { deleteDocumentById } from './apiDelete';

export function unAssignTask(unAssignUsers, taskId) {
  return db
    .collection('UserTasks')
    .where('taskId', '==', taskId)
    .get()
    .then((tasks) => {
      tasks.forEach((userTask) => {
        const { userId, userTaskId, stateId } = userTask.data();
        if (unAssignUsers.includes(userId)) {
          deleteDocumentById('UserTasks', userTaskId).then(() => {
            deleteDocumentById('TasksState', stateId).then(() => {
              db.collection('TaskTracks')
                .where('userTaskId', '==', userTaskId)
                .get()
                .then((taskStates) => {
                  taskStates.forEach((taskState) => {
                    const { taskTrackId } = taskState.data();
                    deleteDocumentById('TaskTracks', taskTrackId);
                  });
                });
            });
          });
        }
      });
    });
}

export function assignTaskToUsers(executors, executorsDBSnapshot, taskId) {
  const difference = executors.filter((user) => !executorsDBSnapshot.includes(user));
  difference.forEach((userId) => {
    const userTask = {};
    userTask.userTaskId = faker.fake('{{random.number}}');
    userTask.taskId = taskId;
    userTask.userId = userId;
    userTask.stateId = faker.fake('{{random.number}}');
    return db
      .collection('UserTasks')
      .doc(userTask.userTaskId)
      .set(userTask)
      .then(() => ({ message: 'Task created successfully' }))
      .catch(({ message }) => ({ message, messageType: 'warning' }));
  });
}
