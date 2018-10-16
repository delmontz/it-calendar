const web = require('superagent');
const firebase = require('firebase');
require('firebase/firestore');
require('dotenv').config();
const ENV = process.env;

const period = '201808';
console.log('データ取得開始');

/* firebase各種 初期化 */
firebase.initializeApp({
   apiKey: ENV.FB_API_KEY,
   authDomain: ENV.FB_AUTHDOMAIN,
   projectId: ENV.FB_PROJECT_ID
});
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

/* 登録開始 */
let index = 1;
let num = 0;
creatData(index);

/****************************/

function creatData(index){
   /* 一括書き込み用バッチ */
   let batch = db.batch();
   /* conpass-apiよりデータ取得開始 */
   web.get('https://connpass.com/api/v1/event/')
   .query({
      ym: period,
      count: 100,
      order: 1,
      start: index
   })
   .end(function(err, res){
      console.log('コンパスよりデータ取得完了');
      console.log('総イベント数' + res.body.results_available);
      console.log('イベント情報構造体作成');
      let rawData = res.body;
      /* 取得データより構造体作成 */
      for(i = 0; i < rawData.results_returned; i++){
         let resData = rawData.events[i];
         let eventContent = {
            event_id: resData.event_id,
            title: resData.title,
            description: resData.description,
            open_time: resData.started_at,
            place: resData.place,
            address: resData.address,
            thumb: 'https://connpass.com/static/img/api/connpass_logo_1.png'      
         };
         let record = db.collection('EventData').doc('conpass').collection(period).doc('' + num++);
         batch.set(record, eventContent);
      }
      /* Firestoreに登録開始 */
      batch.commit().then(function(docRef){
         /* 再帰処理 */
         if(index === 1){ /* インデックス初回更新 */
            index = rawData.results_available - rawData.results_returned;
            console.log(index);
            creatData(index);
         }else{
            index = index - rawData.results_returned;
            if(index > 0){
               console.log(index);
               creatData(index);
            }else{
               console.log('完了:' + index);
            }
         }
      })
      .catch(function(error) {
         console.error('データベースに登録失敗・・・');
         console.error(error);
      });
   });
}

