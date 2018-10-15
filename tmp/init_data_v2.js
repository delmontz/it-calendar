const web = require('superagent');
const firebase = require('firebase');
require('firebase/firestore');
require('dotenv').config();
const ENV = process.env;

/* config */
const PERIOD = '201808';
const ACQUISITION = 100;

/******************/
console.log('データ取得開始');

/* firebase各種 初期化 */
firebase.initializeApp({
   apiKey: ENV.FB_API_KEY,
   authDomain: ENV.FB_AUTHDOMAIN,
   projectId: ENV.FB_PROJECT_ID
});
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

/* conpass-apiよりデータ取得 */
createMonthlyEventTbl(PERIOD).then(() => {
  console.log('完了');
});

/****************************************/

async function createMonthlyEventTbl(period){
   let year = period.slice(0,4);
   let month = period.slice(4);
   let acquired_data;
   let event_id_record = [];
   let event_update_record = [];

   /* 日毎にデータ書き込み */
   for(let day = 1; day <= getDay(period); day++){
		let _acquired_num = 0;
		acquired_data = {available: 1}; /* 必ず一度は実行 */
      for(let n = 0; acquired_data.available > 0; n++){
        acquired_data = await getDailyEventData(year, month, day, ((n * ACQUISITION) + 1));
        Array.prototype.push.apply(event_id_record, acquired_data.event_id_tbl);
        Array.prototype.push.apply(event_update_record, acquired_data.event_update_tbl);
        _acquired_num++;
      }
      console.log('ステージ:' + _acquired_num);
      console.log('###################################');
   }
   /* テーブルソーティング */
   event_id_record.sort((x, y) => {
      return x - y;
   });
   event_update_record.sort();
   /* イベントIDと更新時間テーブルの書き込み */
   db.collection('EventData').doc('conpass').collection(PERIOD).doc('0_event_tbl')
      .set({'event_id_tbl': event_id_record, 'event_update_tbl': event_update_record})
      .then(() => {
         console.log('イベントID＆更新時間テーブルの書き込み完了');
      }).catch(err => {
         console.log(err);
   });
}

async function getDailyEventData(year, month, day, index){
   let eventTbl = {
      available: 0,
      event_data: [],
      event_id_tbl: [],
      event_update_tbl: []
   };
   let acquired_data = {};
   try{
      acquired_data = await web.get('https://connpass.com/api/v1/event/')
     .query({
        ymd: year + month + day,
        count: ACQUISITION,
        order: 3,
        start: index
     });
     console.log(day + '日目取得完了');
     console.log('取得数:' + acquired_data.body.results_returned);
  }catch(err){
     console.log(err);
  }

  /* 取得データより構造体作成 */
  let acquired_body = acquired_data.body; 
  for(let i = 0; i < acquired_body.results_returned; i++){
     let events = acquired_body.events[i];
     let eventContent = {
        event_id: events.event_id,
        title: events.title,
        description: events.description,
        open_time: events.started_at,
        place: events.place,
        address: events.address,
        url: events.event_url,
        updated: events.updated_at
     };
     eventTbl.event_data.push(eventContent);
  }
  eventTbl.available = acquired_body.results_available - (index + ACQUISITION);

   /* レコードにセット書き込み,イベントIDテーブルと更新時間テーブルの作成*/
   let batch = db.batch();
   for(let i = 0; i < eventTbl.event_data.length; i++){
      let event_id = eventTbl.event_data[i].event_id;
      let update = eventTbl.event_data[i].updated
      let record = db.collection('EventData').doc('conpass').collection(PERIOD).doc(String(event_id));
      batch.set(record, eventTbl.event_data[i]);
      eventTbl.event_id_tbl.push(event_id);
      eventTbl.event_update_tbl.push(update);
   };
   await batch.commit().then(() => {
      console.log(day + '日目Firestore登録完了!!');
   }).catch(err => {
      console.log(err);
   });

   return eventTbl;
}

function getDay(period){
   return(new Date(period.slice(0,4), period.slice(4), 0).getDate());
}


/****************************/
