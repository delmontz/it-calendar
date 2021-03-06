const functions = require('firebase-functions');
const firebase = require('firebase');
const cors = require('cors')({origin: true});
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

/* param: ymd */
exports.getEventData = functions.region('asia-northeast1').https.onRequest((req, res) => {
   cors(req, res, async () => {
      let ym = req.query.ymd.substr(0, 6);
      let day = Number(req.query.ymd.substr(6, 2));
      let event_data_tbl = [];
      let ref = DB.collection('EventData').doc('conpass').collection(ym).where('date', '==', day);
      await ref.get().then(snapshot => {
         snapshot.forEach(event_data => {
            event_data_tbl.push(event_data.data());
         });
      });
      res.status(200).send(event_data_tbl);
   });
});
