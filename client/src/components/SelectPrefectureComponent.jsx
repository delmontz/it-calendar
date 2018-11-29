import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {inject, observer} from 'mobx-react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
   formControl: {
      margin: theme.spacing.unit,
      minWidth: 120
   }
});

@inject('eventStore')
@observer
class SelectPrefectureComponent extends React.Component{
   
   constructor(props){
      super(props);
   }

   render(){
      const { classes, eventStore } = this.props;

      return (
         <FormControl className={classes.formControl}>
            <InputLabel>地域選択</InputLabel>
            <Select value={eventStore.select_prefecture} onChange={event => {eventStore.setPrefecture(event)}}>
               <MenuItem value={'ALL'}>ALL</MenuItem>
               <MenuItem value={'東京都'}>東京都</MenuItem>
               <MenuItem value={'神奈川県'}>神奈川県</MenuItem>
               <MenuItem value={'埼玉県'}>埼玉県</MenuItem>
               <MenuItem value={'千葉県'}>千葉県</MenuItem>
               <MenuItem value={'京都府'}>京都府</MenuItem>
               <MenuItem value={'大阪府'}>大阪府</MenuItem>
               <MenuItem value={'福岡県'}>福岡県</MenuItem>
               <MenuItem value={'兵庫県'}>兵庫県</MenuItem>
               <MenuItem value={'北海道'}>北海道</MenuItem>
               <MenuItem value={'青森県'}>青森県</MenuItem>
               <MenuItem value={'岩手県'}>岩手県</MenuItem>
               <MenuItem value={'宮城県'}>宮城県</MenuItem>
               <MenuItem value={'秋田県'}>秋田県</MenuItem>
               <MenuItem value={'山形県'}>山形県</MenuItem>
               <MenuItem value={'福島県'}>福島県</MenuItem>
               <MenuItem value={'茨城県'}>茨城県</MenuItem>
               <MenuItem value={'栃木県'}>栃木県</MenuItem>
               <MenuItem value={'群馬県'}>群馬県</MenuItem>
               <MenuItem value={'新潟県'}>新潟県</MenuItem>
               <MenuItem value={'富山県'}>富山県</MenuItem>
               <MenuItem value={'石川県'}>石川県</MenuItem>
               <MenuItem value={'福井県'}>福井県</MenuItem>
               <MenuItem value={'山梨県'}>山梨県</MenuItem>
               <MenuItem value={'長野県'}>長野県</MenuItem>
               <MenuItem value={'岐阜県'}>岐阜県</MenuItem>
               <MenuItem value={'静岡県'}>静岡県</MenuItem>
               <MenuItem value={'愛知県'}>愛知県</MenuItem>
               <MenuItem value={'三重県'}>三重県</MenuItem>
               <MenuItem value={'滋賀県'}>滋賀県</MenuItem>
               <MenuItem value={'奈良県'}>奈良県</MenuItem>
               <MenuItem value={'和歌山県'}>和歌山県</MenuItem>
               <MenuItem value={'鳥取県'}>鳥取県</MenuItem>
               <MenuItem value={'島根県'}>島根県</MenuItem>
               <MenuItem value={'岡山県'}>岡山県</MenuItem>
               <MenuItem value={'広島県'}>広島県</MenuItem>
               <MenuItem value={'山口県'}>山口県</MenuItem>
               <MenuItem value={'徳島県'}>徳島県</MenuItem>
               <MenuItem value={'香川県'}>香川県</MenuItem>
               <MenuItem value={'愛媛県'}>愛媛県</MenuItem>
               <MenuItem value={'高知県'}>高知県</MenuItem>
               <MenuItem value={'佐賀県'}>佐賀県</MenuItem>
               <MenuItem value={'長崎県'}>長崎県</MenuItem>
               <MenuItem value={'熊本県'}>熊本県</MenuItem>
               <MenuItem value={'大分県'}>大分県</MenuItem>
               <MenuItem value={'宮崎県'}>宮崎県</MenuItem>
               <MenuItem value={'鹿児島県'}>鹿児島県</MenuItem>
               <MenuItem value={'沖縄県'}>沖縄県</MenuItem>
            </Select>
         </FormControl>
      );
   }

}

export default withStyles(styles)(SelectPrefectureComponent);