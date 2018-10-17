const web = require('superagent');
const firebase = require('firebase');
require('firebase/firestore');
require('dotenv').config();
const ENV = process.env;

/* config */
const PERIOD = '201808';
const ACQUISITION = 100;

/* conpassAPI config */
const UPDATETIME = 1;
const OPENTDATE = 2;
const NEWER = 3;

/**************************************************************************************/
console.log('データ取得開始');

/* firebase各種 初期化 */
firebase.initializeApp({
   apiKey: ENV.FB_API_KEY,
   authDomain: ENV.FB_AUTHDOMAIN,
   projectId: ENV.FB_PROJECT_ID
});
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

getEventTbl(PERIOD).then(event_tbl => {
   /* 新着確認 */
   checkNewer(event_tbl).then(() => {
      /* 更新確認 */
      checkUpdate();
   });
});

/**************************************************************************************/

async function getConpassMasterTbl(period, index, order) {
   let eventdata = {
      available: 0,
      event_data_tbl: []
   };
   let acquired_data = {};
   try {
      acquired_data = await web.get('https://connpass.com/api/v1/event/')
         .query({
            ym: period,
            count: ACQUISITION,
            order: order,
            start: index
         });
   } catch (err) {
      console.log(err);
   }
   console.log('受信完了');
   /* 取得データより構造体作成 */
   let acquired_body = acquired_data.body;
   for (let i = 0; i < acquired_body.results_returned; i++) {
      let events = acquired_body.events[i];
      let date = new Date(events.started_at);
      let eventContent = {
         event_id: events.event_id,
         title: events.title,
         description: events.description,
         date: date.getDate(),
         time: date.toTimeString(),
         open_time: events.started_at,
         place: events.place,
         address: events.address,
         url: events.event_url,
         updated: events.updated_at
      };
      eventdata.event_data_tbl.push(eventContent);
   }
   eventdata.available = acquired_body.results_available - (index + ACQUISITION);

   return eventdata;
}

async function getEventTbl(period) {
   let event_tbl;
   let record_ref = db.collection('EventData').doc('conpass').collection(period).doc('0_event_tbl');
   await record_ref.get().then(snapshot => {
      event_tbl = snapshot.data();
   }).catch(err => {
      console.log(err);
   });
   return event_tbl;
}

async function checkNewer(event_tbl) {
   let new_event_data_tbl = [];
   let new_event_id_tbl = [];
   let update_flg = false;
   let next_page_flg = true;
   let event_id_tbl = event_tbl.event_id_tbl;
   for (let n = 0; next_page_flg; n++) {
      console.log('%d順目', n);
      await getConpassMasterTbl(PERIOD, ((n * ACQUISITION) + 1), NEWER).then(conpass_tbl => {
         conpass_tbl.event_data_tbl.forEach((eventdata, index) => {
            next_page_flg = false;
            if (!event_id_tbl.includes(eventdata.event_id)) {
               console.log('イベントID:%dを追加', eventdata.event_id);
               new_event_id_tbl.push(eventdata.event_id);
               new_event_data_tbl.push(eventdata);
               update_flg = true;
               /* 最終インデックスが更新対象だった場合次のループも実行 */
               if (((index + 1) % ACQUISITION) == 0) {
                  next_page_flg = true;
               }
            }
         });
      });
   }
   /* 新着データ登録 */
   if (update_flg) {
      /* イベントID＆更新時間テーブル更新 */
      Array.prototype.push.apply(event_id_tbl, new_event_id_tbl);
      db.collection('EventData').doc('conpass').collection(PERIOD).doc('0_event_tbl')
         .set({ 'event_id_tbl': event_id_tbl })
         .then(() => {
            console.log('イベントIDテーブルの書き込み完了');
         }).catch(err => {
            console.log(err);
         });
      /* イベントデータテーブル更新 */
      let batch = db.batch();
      for (let i = 0; i < new_event_data_tbl.length; i++) {
         let event_id = new_event_data_tbl[i].event_id;
         let record = db.collection('EventData').doc('conpass').collection(PERIOD).doc(String(event_id));
         batch.set(record, new_event_data_tbl[i]);
      };
      await batch.commit().then(() => {
         console.log('イベントデータテーブル更新完了');
      }).catch(err => {
         console.log(err);
      });
   }
   console.log('----------------------------------%s:新着チェック完了----------------------------------', PERIOD);
}

async function checkUpdate() {
   let current_date;
   let new_event_data_tbl = [];
   let next_page_flg = true;
   let update_flg = false;
   /* イベントデータテーブルの最新更新時間を取得 */
   let serch_ref = db.collection('EventData').doc('conpass').collection(PERIOD);
   let query = serch_ref.orderBy('updated', 'desc').limit(1);
   await query.get().then(snapshot => {
      current_date = new Date(snapshot.docs[0].data().updated);
   });
   for (let n = 0; next_page_flg; n++) {
      console.log('%d順目', n);
      await getConpassMasterTbl(PERIOD, ((n * ACQUISITION) + 1), UPDATETIME).then(conpass_tbl => {
         next_page_flg = false;
         conpass_tbl.event_data_tbl.forEach((eventdata, index) => {
            let latest_date = new Date(eventdata.updated);
            /* 更新対象判定 */
            if(current_date.getTime() < latest_date.getTime()){
               console.log('イベントID:%dを更新', eventdata.event_id);
               new_event_data_tbl.push(eventdata);
               update_flg = true;
               /* 最終インデックスが更新対象だった場合次のループも実行 */
               if (((index + 1) % ACQUISITION) == 0) {
                  next_page_flg = true;
               }
            }
         });
      });
   }
   /* 更新データ登録 */
   if(update_flg == true){
      /* イベントデータテーブル更新 */
      let batch = db.batch();
      for (let i = 0; i < new_event_data_tbl.length; i++) {
         let event_id = new_event_data_tbl[i].event_id;
         let record = db.collection('EventData').doc('conpass').collection(PERIOD).doc(String(event_id));
         batch.set(record, new_event_data_tbl[i]);
      };
      await batch.commit().then(() => {
         console.log('イベントデータテーブル更新完了');
      }).catch(err => {
         console.log(err);
      });
   }
   console.log('----------------------------------%s:更新チェック完了----------------------------------', PERIOD);
}
