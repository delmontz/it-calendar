import React from 'react';
import BaseDayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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
};

const toDayStyle = `.DayPicker-Day--today {
  background-color: #2f4f4f;
  color: white;
}`;

export default function DayPicker() {
  return(
    <div>
      <style>{toDayStyle}</style>
      <BaseDayPicker 
        locale="ja"
        months={MONTHS}
        weekdaysLong={WEEKDAYS_LONG}
        weekdaysShort={WEEKDAYS_SHORT}
        firstDayOfWeek={0} //日曜日始まり
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
      />
    </div>
  );
}