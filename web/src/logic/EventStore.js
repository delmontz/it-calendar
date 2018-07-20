import {observable, action} from 'mobx';
import web from "superagent";

export default class EventStore {
    @observable selected_date = new Date();
    @observable view_current_str = '今日のイベント';
    @observable acquired_event_data = {};

    @action setSelectingDate = (date) => {
       this.selected_date = date;
       this.view_current_str = '' + (date.getMonth() + 1) + '月' + date.getDate() + '日のイベント情報😆';
       let self = this;
       web.get('http://localhost:3000/api')
       .query({period: '' + date.getFullYear() + ('00' + (date.getMonth() + 1)).slice(-2) + ('00' + date.getDate()).slice(-2)})
       .then(function(res){
         self.acquired_event_data = res.body;
       });
    }
}