import db from './db';
import getLocaleDate from '../components/helpers/getLocaleDate/getLocalDate';

export function getMembers() {
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
    .catch((error) => {
      return error;
    });
}

export function getMember(userId) {
  const member = {};
  return db
    .collection('Users')
    .doc(userId)
    .get()
    .then((user) => {
      const {
        firstName,
        lastName,
        birthDate,
        directionId,
        education,
        startDate,
        userId,
        email,
        university,
        mathScore,
        address,
        mobilePhone,
        skype,
        sex,
      } = user.data();

      member.firstName = firstName;
      member.lastName = lastName;
      member.birthDate = getLocaleDate(birthDate, 'fr-CA');
      member.directionId = directionId;
      member.education = education;
      member.startDate = getLocaleDate(startDate, 'fr-CA');
      member.userId = userId;
      member.email = email;
      member.university = university;
      member.mathScore = mathScore;
      member.address = address;
      member.mobilePhone = mobilePhone;
      member.skype = skype;
      member.sex = sex;

      return member;
    })
    .catch((error) => {
      return error;
    });
}

export function getUserTaskList(userId) {
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
        return getUserTasks(task.taskId, task.userTaskId, task.stateId);
      });
      const taskData = Promise.all(tasks);
      return taskData;
    })
    .catch((error) => {
      return error;
    });
}

export function getUserTasks(taskId, userTaskId, stateId) {
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
      taskData.userTaskId = userTaskId;
      taskData.stateId = stateId;
    })
    .then(async () => {
      await db
        .collection('TasksState')
        .doc(stateId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            taskData.status = doc.data().stateName;
          }
        });
      return taskData;
    })
    .catch((error) => {
      return error;
    });
}

export function getAllTasks() {
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
    })
    .catch((error) => {
      return error;
    });
}

export function getTask(taskId) {
  return db
    .collection('Tasks')
    .doc(taskId)
    .get()
    .then((task) => {
      const { startDate, deadlineDate } = task.data();
      return {
        ...task.data(),
        startDate: getLocaleDate(startDate, 'fr-CA'),
        deadlineDate: getLocaleDate(deadlineDate, 'fr-CA'),
      };
    })
    .catch((error) => {
      return error;
    });
}

// all tracks of current task
export function getTaskTrack(userTaskId, name) {
  return db
    .collection('TaskTracks')
    .where('userTaskId', '==', userTaskId)
    .get()
    .then((trackData) => {
      const taskTrackList = trackData.docs.map((userTask) => {
        const { taskTrackId, userTaskId, trackDate, trackNote } = userTask.data();
        return { name, taskTrackId, userTaskId, trackDate, trackNote };
      });
      return taskTrackList;
    })
    .catch((error) => {
      return error;
    });
}

// for task tracks
export function getTaskName(userTaskId) {
  return db
    .collection('UserTasks')
    .doc(userTaskId)
    .get()
    .then((userTaskData) => {
      const { taskId } = userTaskData.data();
      return db
        .collection('Tasks')
        .doc(taskId)
        .get()
        .then((taskData) => {
          const { name } = taskData.data();
          return name;
        });
    })
    .catch((error) => {
      return error;
    });
}

// track data for modal
export function getTrack(taskTrackId) {
  const trackData = {};
  return db
    .collection('TaskTracks')
    .doc(taskTrackId)
    .get()
    .then((track) => {
      const { taskTrackId, userTaskId, trackDate, trackNote } = track.data();
      trackData.taskTrackId = taskTrackId;
      trackData.userTaskId = userTaskId;
      trackData.trackDate = getLocaleDate(trackDate, 'fr-CA');
      trackData.trackNote = trackNote;
      return trackData;
    })
    .catch((error) => {
      return error;
    });
}

// for member progress
export function getUserTrackList(userId) {
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
        const currentTrack = getTaskTracksWithName(task.userTaskId, task.taskId);
        return currentTrack;
      });
      const trackData = Promise.all(userTracks);
      return trackData;
    })
    .catch((error) => {
      return error;
    });
}

function getTaskTracksWithName(userTaskId, taskId) {
  return db
    .collection('Tasks')
    .doc(taskId)
    .get()
    .then((taskData) => {
      const { name } = taskData.data();
      const track = getTaskTrack(userTaskId, name);
      return track;
    })
    .catch((error) => {
      return error;
    });
}

// get track when its single
export function getTaskTrackData(userTaskId, name) {
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
      return error;
    });
}

export function getExecutors(taskId) {
  let executors = {};
  return db
    .collection('UserTasks')
    .where('taskId', '==', taskId)
    .get()
    .then((userTasks) => {
      userTasks.forEach((user) => {
        const { userId } = user.data();
        executors = { ...executors, [userId]: { prevAssign: true, assign: true } };
      });
      return executors;
    })
    .catch((error) => {
      return error;
    });
}

export function getDirections() {
  return db
    .collection('Directions')
    .orderBy('directionId')
    .get()
    .then((directions) => {
      const directionsList = directions.docs.map((direction) => {
        const { directionId, name } = direction.data();
        return { directionId, name };
      });
      return directionsList;
    })
    .catch((error) => {
      return error;
    });
}
