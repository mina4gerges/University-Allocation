import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

export default function FiltrationBar(props) {

    let liveColor = props.statusColor.live;
    let upcomingColor = props.statusColor.upcoming;
    let cancelledColor = props.statusColor.cancelled;
    let vacantColor = props.statusColor.vacant;

    let { handleCheckBoxChange, live, upcoming, cancelled, vacant, radioSelectedValue, handleRadioChange } = props;

    const LiveCheckbox = withStyles({
        root: { color: liveColor, '&$checked': { color: liveColor } },
        checked: {},
    })(props => <Checkbox color="default" {...props} />);

    const UpComingCheckbox = withStyles({
        root: { color: upcomingColor, '&$checked': { color: upcomingColor } },
        checked: {},
    })(props => <Checkbox color="default" {...props} />);

    const CancelledCheckbox = withStyles({
        root: { color: cancelledColor, '&$checked': { color: cancelledColor } },
        checked: {},
    })(props => <Checkbox color="default" {...props} />);

    const VacantCheckbox = withStyles({
        root: { color: vacantColor, '&$checked': { color: vacantColor } },
        checked: {},
    })(props => <Checkbox color="default" {...props} />);

    return (
        < div className='filtration-bar' >
            <div className='row filtration-status'>
                <span className='col-2'><b>Class Status :</b></span>
                <span className='col-10'>
                    <FormControlLabel
                        control={
                            <LiveCheckbox
                                checked={live}
                                onChange={handleCheckBoxChange}
                                value="live"
                            />
                        }
                        label='Live'
                        style={{ color: liveColor }}
                    />
                    <FormControlLabel
                        control={
                            <UpComingCheckbox
                                checked={upcoming}
                                onChange={handleCheckBoxChange}
                                value="upcoming"
                            />
                        }
                        label='Up Coming'
                        style={{ color: upcomingColor }}
                    />
                    <FormControlLabel
                        control={
                            <CancelledCheckbox
                                checked={cancelled}
                                onChange={handleCheckBoxChange}
                                value="cancelled"
                            />
                        }
                        label='Cancelled'
                        style={{ color: cancelledColor }}
                    />
                    <FormControlLabel
                        control={
                            <VacantCheckbox
                                checked={vacant}
                                onChange={handleCheckBoxChange}
                                value="vacant"
                            />
                        }
                        label='Vacant'
                        style={{ color: vacantColor }}
                    />
                </span>
            </div>

            <div className='row filtration-floor-room'>
                <span className='col-2'><b>Floor / Room :</b></span>
                <span className='col-10'>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={radioSelectedValue === 'floor'}
                                onChange={handleRadioChange}
                                value="floor"
                                name="floor"
                                color="default"
                            />
                        }
                        label='Floor'
                    />
                    <FormControlLabel
                        control={
                            <Radio
                                checked={radioSelectedValue === 'room_ID'}
                                onChange={handleRadioChange}
                                value="room_ID"
                                name="room_ID"
                                color="default"
                            />
                        }
                        label='Room'
                    />
                </span>
            </div>
        </div >
    )
}
