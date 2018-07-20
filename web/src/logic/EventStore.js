import {observable, action} from 'mobx';

export default class EventStore {
    @observable selected_date = new Date();
    @observable view_current_str = '今日のイベント';
    @observable acquired_event_data = {};

    @action setSelectingDate = (date) => {
       this.selected_date = date;
       this.view_current_str = '' + date.getMonth() + '月' + date.getDate() + '日のイベント情報😆';
    }
}