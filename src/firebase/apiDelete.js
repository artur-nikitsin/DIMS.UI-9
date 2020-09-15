import React from 'react';
import db from './db';

export function deleteUser(userId) {
  return deleteDocumentById('Users', userId)
    .then(() => {
      return db
        .collection('UserTasks')
        .where('userId', '==', userId)
        .get();
    })
    .then((tasks) => {
      tasks.forEach((task) => {
        const { userTaskId } = task.data();
        deleteDocumentById('UserTask', userTaskId);
        return db
          .collection('TaskTracks')
          .where('userTaskId', '==', userTaskId)
          .get()
          .then((tracks) => {
            tracks.forEach((track) => {
              const { taskTrackId } = track.data();
              deleteDocumentById('TaskTracks', taskTrackId);
            });
          });
      });
    })
    .then(() => {
      console.log('User successfully deleted');
      return 'OK';
    })
    .catch((error) => {
      console.error(`Error receiving data: ${error}`);
    });
}

const deleteDocumentById = (collection, docId) => {
  if (docId) {
    return db
      .collection(collection)
      .doc(docId)
      .delete()
      .then(() => {
        console.log('User successfully deleted');
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  }
};
