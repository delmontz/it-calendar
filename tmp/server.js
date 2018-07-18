const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const web = require('superagent');

// all routes prefixed with /api
app.use('/api', router);

// using router.get() to prefix our path
// url: http://localhost:3000/api/
router.get('/', (request, response) => {
   web.get('https://connpass.com/api/v1/event/')
      .query({ym: request.query.period})
      .end(function(err, res){
         console.log('Done!!');
         response.json(createEventData(res.body, request.query.period));
      });
});

// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));

function createEventData(rawData, period){
   /* イベント情報構造体 */
   let eventData = {
      monthly: period,
      events: []
   }
   /* 取得データより構造体作成 */
   for(i = 0; i < rawData.results_returned; i++){
      let resData = rawData.events[i];
      let eventContent = {
         provider: 'conpass',
         event_id: resData.event_id,
         title: resData.title,
         description: resData.description,
         open_time: resData.started_at,
         place: resData.place,
         address: resData.address,
         thumb: 'null'      
      };
      eventData.events.push(eventContent);
   }
   return eventData;
}