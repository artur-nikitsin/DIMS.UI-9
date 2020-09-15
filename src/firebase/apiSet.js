import React from 'react';
import db from './db';
import faker from 'faker';

export function editMemberData(data) {
  return db
    .collection('Users')
    .doc(data.userId)
    .set({
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      directionId: data.directionId,
      education: data.education,
      startDate: data.startDate,
      userId: data.userId,
    })
    .then(() => {
      console.log('Document successfully written!');
      return 'OK';
    })

    .catch((error) => {
      console.error('Error writing document: ', error);
      return error;
    });
}

export function setNewMemberData(data) {
  const userId = faker.fake('{{random.number}}');
  const members = db.collection('Users');
  const member = db.collection('Users').doc(userId);
  return member
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
      } else {
        members.doc(userId).set({
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: data.birthDate,
          directionId: data.directionId,
          education: data.education,
          startDate: data.startDate,
          userId: userId,
        });
      }
    })
    .then(() => {
      console.log('Document successfully written!');
      return 'OK';
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
    });
}
