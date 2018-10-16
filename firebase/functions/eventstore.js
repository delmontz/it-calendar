const functions = require('firebase-functions');
const firebase = require('firebase');
require('firebase/firestore');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

firebase.initializeApp({
   apiKey: functions.config().store.api_key,
   authDomain: functions.config().store.authdomain,
   projectId: functions.config().store.project_id
});
const DB = firebase.firestore();
DB.settings({ timestampsInSnapshots: true });

exports.getEventData = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
   let event_data;
   await DB.collection('EventData').doc('conpass').collection('201808').doc('101899').get().then(snapshot => {
      event_data = snapshot.data();
   });
   res.status(200).send(event_data);
});
