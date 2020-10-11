import db from "./db";
import faker from "faker";

export function editMemberData(userId, data) {
  return db
    .collection("Users")
    .doc(userId)
    .set(saveDataTemplate(userId, data))
    .then(() => {
      console.log("Document successfully written!");
      return "OK";
    })

    .catch((error) => {
      console.error("Error writing document: ", error);
      return error;
    });
}

export function setNewMemberData(data) {
  const userId = faker.fake("{{random.number}}");
  const members = db.collection("Users");
  const member = db.collection("Users").doc(userId);
  return member
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        members.doc(userId).set(saveDataTemplate(userId, data));
      }
    })
    .then(() => {
      console.log("Document successfully written!");
      return "OK";
    })
    .catch(function(error) {
      console.log("Error writting document:", error);
    });

}

const saveDataTemplate = (userId, data) => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    directionId: data.directionId,
    education: data.education,
    startDate: data.startDate,
    userId: userId,
    email: data.email,
    sex: data.sex,
    university: data.university,
    mathScore: data.mathScore,
    address: data.address,
    mobilePhone: data.mobilePhone,
    skype: data.skype
  };
};

export function createTask(taskData) {
  const taskId = faker.fake("{{random.number}}");
  return db
    .collection("Tasks")
    .doc(taskId)
    .set({ ...taskData, taskId });
}

export function editTask(taskId, taskData) {

  return db
    .collection("Tasks")
    .doc(taskId)
    .set({ ...taskData, taskId });
}


export function createTrack(trackData) {
  const taskTrackId = faker.fake("{{random.number}}");
  return db
    .collection("TaskTracks")
    .doc(taskTrackId)
    .set({ ...trackData, taskTrackId });
}

export function editTrack(taskTrackId, trackData) {
  return db
    .collection("TaskTracks")
    .doc(taskTrackId)
    .set({ ...trackData, taskTrackId });
}