import React, { useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import moment from 'moment';

export default function DateTimePickerComp(props) {

    const [selectedDate, setSelectedDate] = useState(new moment());

    function handleDateChange(date) {
        setSelectedDate(date);
        props.dateTimePickerValue(props.name, date);
    }

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDateTimePicker
                ampm
                showTodayButton
                value={props.value ? props.value : selectedDate}
                onChange={handleDateChange}
                minDate={new moment()}
                format="DD/MM/YYYY hh:mm a"
            // maxDateMessage="test 1"
            // minDateMessage="test 2"
            // invalidDateMessage="Invalid"
            />
        </MuiPickersUtilsProvider>
    );
}