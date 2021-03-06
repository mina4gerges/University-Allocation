import React, { useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

export default function DateTimePickerComp(props) {

    const [selectedDate, setSelectedDate] = useState(new Date());

    function handleDateChange(date) {
        setSelectedDate(date);
        props.dateTimePickerValue(props.name, date);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
                ampm
                showTodayButton
                value={props.value ? props.value : selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                format="DD/MM/YYYY hh:mm a"
            // maxDateMessage="test 1"
            // minDateMessage="test 2"
            // invalidDateMessage="Invalid"
            />
        </MuiPickersUtilsProvider>
    );
}