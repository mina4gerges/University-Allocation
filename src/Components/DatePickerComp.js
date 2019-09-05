import React from "react";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

function DatePcikerComp(props) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                clearable
                value={props.value}
                placeholder="10/10/2018"
                onChange={props.onChange}
                minDate={new Date()}
                format="dd/MM/yyyy"
                label={props.label}
                error={props.error}
            // maxDateMessage="test 1"
            // minDateMessage="test 2"
            // invalidDateMessage="Invalid"
            />
        </MuiPickersUtilsProvider>
    );
}

export default DatePcikerComp;