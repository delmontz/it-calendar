const eventstore = require('./eventstore');
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.echo =functions.region('asia-northeast1').https.onRequest((req, res) => {
   res.status(200).send(req.query.echo);
});

exports.getEventData = eventstore.getEventData;
