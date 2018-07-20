import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {inject, observer} from 'mobx-react';

const MONTHS = [
   '1月',
   '2月',
   '3月',
   '4月',
   '5月',
   '6月',
   '7月',
   '8月',
   '9月',
   '10月',
   '11月',
   '12月'
 ];
 
 const WEEKDAYS_LONG = [
    '日曜日',
    '月曜日',
    '火曜日',
    '水曜日',
    '木曜日',
    '金曜日',
    '土曜日'
 ];
 
 const WEEKDAYS_SHORT = ['日', '月', '火', '水', '木', '金', '土'];
 
 const modifiers = {
   sunday: { daysOfWeek: [0] }, 
   saturday: { daysOfWeek: [6] } // daysOfWeek: [0, 6]で土日を範囲指定
 };
 
 const modifiersStyles = {
   sunday: {
     color: '#ff4500',
     backgroundColor: '#fffdee'
   },
   saturday: {
     color: '#4169e1',
     backgroundColor: '#fffdee'
   },
   //today selectedが内部属性にある詳しくはdoc参照
   today: { 
    backgroundColor: '#2f4f4f',
    color: 'white'
   },
   selected: {
    backgroundColor: 'orange',
    color: 'white'
   }
 };

 @inject('eventStore')
 @observer
export default class DayPickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null,
    };
  }
  handleDayClick(day, { selected }) {
    this.props.eventStore.setSelectingDate(day);
    this.setState({
      selectedDay: selected ? undefined : day,
    });
  }
  render() {
    return (
      <div>
          <p>
          {this.state.selectedDay
            ? ('選択中の日付　' + this.state.selectedDay.toLocaleDateString())
            : '>>日付を選択してください<< 👌'}
        </p>
        <DayPicker
         locale="ja"
         months={MONTHS}
         weekdaysLong={WEEKDAYS_LONG}
         weekdaysShort={WEEKDAYS_SHORT}
         firstDayOfWeek={0} //日曜日始まり
         modifiers={modifiers}
         modifiersStyles={modifiersStyles}
         selectedDays={this.state.selectedDay}
         onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}