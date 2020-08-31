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
          console.log(task.taskId);
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
    if (taskId) {
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
    } else {
      return db
        .collection('Tasks')
        .get()
        .then((tasks) => {
          const taskData = tasks.docs.map((task) => {
            const { taskId, name, description, startDate, deadlineDate } = task.data();
            return {
              taskId,
              name,
              description,
              startDate,
              deadlineDate,
            };
          });
          return taskData;
        });
    }
  },

  getUserTrackList(userId) {
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
        const userTracks = userTaskList.map((task) => {
          let currentTrack = this.getTaskName(task.userTaskId, task.taskId);
          return currentTrack;
        });
        const trackData = Promise.all(userTracks);
        return trackData;
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  },

  getTaskName(userTaskId, taskId) {
    return db
      .collection('Tasks')
      .doc(taskId)
      .get()
      .then((taskData) => {
        const { name } = taskData.data();
        const track = this.getTaskTrackData(userTaskId, name);
        return track;
      })
      .then();
  },

  getTaskTrackData(userTaskId, name) {
    const tracks = {};
    return db
      .collection('TaskTracks')
      .where('userTaskId', '==', userTaskId)
      .get()
      .then((trackData) => {
        trackData.docs.forEach((userTrack) => {
          const { taskTrackId, userTaskId, trackDate, trackNote } = userTrack.data();
          tracks.name = name;
          tracks.taskTrackId = taskTrackId;
          tracks.userTaskId = userTaskId;
          tracks.trackDate = trackDate;
          tracks.trackNote = trackNote;
        });
        return tracks;
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  },
};

export default api;
