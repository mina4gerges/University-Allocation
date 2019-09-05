import React from "react";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

function TimePickerComp(props) {
    let error = {};
    if (props.error) error = { error: props.error };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
                label={props.label}
                placeholder="08:00 AM"
                mask="__:__ _M"
                value={props.value}
                onChange={props.onChange}
                style={{ width: '100%' }}
                {...error}
            />
        </MuiPickersUtilsProvider>
    );
}

export default TimePickerComp;