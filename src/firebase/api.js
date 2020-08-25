import db from './db';

const api = {
  getMembers() {
    return db
      .collection('Users')
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

  getUserTaskList(userId) {
    return db
      .collection('UserTasks')
      .where('userId', '==', userId)
      .get()
      .then((userTasks) => {
        const userTaskList = userTasks.docs.map((userTask) => {
          const { userTaskId, taskId, userId, stateId } = userTask.data();
          return { userTaskId, taskId, userId, stateId };
        });
        return userTaskList;
      })
      .then((userTaskList) => {
        const tasks = userTaskList.map((task) => {
          return this.getTasks(task.taskId);
        });

        const taskData = Promise.all(tasks);
        return taskData;
      })

      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  },

  getTasks(taskId) {
    const taskData = {};
    return db
      .collection('Tasks')
      .doc(taskId)
      .get()
      .then((task) => {
        const { name, description, startDate, deadlineDate } = task.data();
        taskData.taskId = taskId;
        taskData.name = name;
        taskData.description = description;
        taskData.startDate = startDate;
        taskData.deadlineDate = deadlineDate;

        return taskData;
      });
  },
};

export default api;
