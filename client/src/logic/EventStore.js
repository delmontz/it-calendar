import { observable, action } from 'mobx';
import web from "superagent";

export default class EventStore {
   @observable selected_date = new Date();
   @observable view_current_str = '今日のイベント';
   @observable acquired_event_data = [];
   @observable event_view_loading = 'init';
   @observable select_prefecture = 'ALL';

   @action setSelectingDate = (date) => {
      this.selected_date = date;
      this.view_current_str = '' + (date.getMonth() + 1) + '月' + date.getDate() + '日のイベント情報😆';
      let self = this;
      this.event_view_loading = true;
      web.get('https://asia-northeast1-dailygadget000.cloudfunctions.net/getEventData')
         .query({ ymd: '' + date.getFullYear() + ('00' + (date.getMonth() + 1)).slice(-2) + ('00' + date.getDate()).slice(-2) })
         .set('Access-Control-Allow-Origin', '*')
         .then(function (res) {
            self.acquired_event_data = res.body;
            self.event_view_loading = false;
         });
   }

   @action setPrefecture(event){
      this.select_prefecture = event.target.value;
   }

}