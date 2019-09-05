import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { cloneDeep, map, includes, filter } from 'lodash';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid'
// import { roomName, roomStatus, teacherName, courseName } from '../Data/DashBoardData';
import { roomName, teacherName, courseName } from '../Data/DashBoardData';
import TimePickerComp from '../Components/TimePickerComp';
import DatePcikerComp from '../Components/DatePickerComp';
class ModalDataChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomName,
            //roomStatus,
            teacherName,
            courseName,
            tempMandatory: [],
            dataSelected: cloneDeep(this.props.dataSelected),
        }

        this.mode = !this.props.dataSelected.class_ID ? 'addNew' : 'edit';

        this.toSave = [
            'room',
            'date',
            'startTime',
            'endTime',
        ];

        this.mandatory = [
            'room',
            'date',
            'startTime',
            'endTime',
        ];

        if (this.mode === 'addNew') {
            this.toSave.push('teacher');
            this.toSave.push('course');

            this.mandatory.push('teacher');
            this.mandatory.push('course');
        }
    }

    handleChange = event => {
        let { name, value } = event.target;
        let { dataSelected, tempMandatory } = this.state;
        dataSelected[name] = value;
        tempMandatory = filter(tempMandatory, val => { return val !== name });
        this.setState({ dataSelected, tempMandatory })
    }

    handleDateTimeChange = name => value => {
        let { dataSelected, tempMandatory } = this.state;
        dataSelected[name] = value;
        tempMandatory = filter(tempMandatory, val => { return val !== name });
        if (name !== 'date' && value && isValid(value) && dataSelected.date && isValid(dataSelected.date)) {
            dataSelected[name] = new Date(format(dataSelected.date, 'yyy-MM-dd') + " " + format(value, 'hh:mm a'))
        }
        this.setState({ dataSelected, tempMandatory });
    }


    handleModalSave = dataSelected => e => {
        let count = 0;
        let tempMandatory = [];

        map(this.toSave, val => {
            if (!dataSelected[val]) {
                count++;
                tempMandatory.push(val);
            }
        })

        if (count === 0) this.props.handleModalSave(dataSelected)(e);
        this.setState({ tempMandatory });
    }

    render() {
        let { onClose, open } = this.props;
        // let { dataSelected, roomStatus, roomName, teacherName, courseName } = this.state;
        let { dataSelected, roomName, teacherName, courseName, tempMandatory } = this.state;
        let headerLabel = 'New Class';
        if (dataSelected.course) headerLabel = dataSelected.course.toUpperCase();
        if (dataSelected.teacher) headerLabel = dataSelected.teacher;
        if (dataSelected.course && dataSelected.teacher) headerLabel = dataSelected.course.toUpperCase() + " (" + dataSelected.teacher + ")";

        return (
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" className='modal-data-change' >
                <DialogContent>
                    <DialogContentText style={{ textAlign: 'center' }} title={headerLabel === 'New Class' ? 'New Class' : 'Course And Teacher Name'}>
                        {headerLabel}
                    </DialogContentText>
                    {this.mode === 'addNew' &&
                        <div>
                            <FormControl style={{ width: '100%' }} className='row' error={includes(tempMandatory, 'teacher')}>
                                <InputLabel htmlFor="age-simple" >Teacher</InputLabel>
                                <Select
                                    value={dataSelected.teacher ? dataSelected.teacher : ''}
                                    onChange={this.handleChange}
                                    name='teacher'
                                >
                                    {map(teacherName, teacherValue => { return (<MenuItem key={teacherValue.value} value={teacherValue.value} >{teacherValue.label}</MenuItem>) })}
                                </Select>
                            </FormControl>
                            <FormControl style={{ width: '100%' }} className='row' error={includes(tempMandatory, 'course')}>
                                <InputLabel htmlFor="age-simple">Course</InputLabel>
                                <Select
                                    value={dataSelected.course ? dataSelected.course : ''}
                                    onChange={this.handleChange}
                                    name='course'
                                >
                                    {map(courseName, courseValue => { return (<MenuItem key={courseValue.value} value={courseValue.value} >{courseValue.label}</MenuItem>) })}
                                </Select>
                            </FormControl>
                        </div>
                    }
                    <FormControl style={{ width: '100%' }} className='row' error={includes(tempMandatory, 'room')}>
                        <InputLabel htmlFor="age-simple">Room</InputLabel>
                        <Select
                            value={dataSelected.room}
                            onChange={this.handleChange}
                            name='room'
                        >
                            {map(roomName, roomValue => { return (<MenuItem key={roomValue.value} value={roomValue.value} >{roomValue.label}</MenuItem>) })}
                        </Select>
                    </FormControl>
                    {/* <FormControl style={{ width: '100%' }} className='row'>
                        <InputLabel htmlFor="age-simple">Status</InputLabel>
                        <Select
                            value={dataSelected.status}
                            onChange={this.handleChange}
                            name='status'
                        >
                            {map(roomStatus, statusName => { return (<MenuItem key={statusName.value} value={statusName.value} >{statusName.label}</MenuItem>) })}
                        </Select>
                    </FormControl> */}
                    <div className='row date-time'>
                        <DatePcikerComp
                            label='Date'
                            value={dataSelected.date}
                            onChange={this.handleDateTimeChange('date')}
                            error={includes(tempMandatory, 'date')}
                        />
                    </div>
                    <div className='row date-time'>
                        <TimePickerComp
                            label='Start Time'
                            value={dataSelected.startTime}
                            onChange={this.handleDateTimeChange('startTime')}
                            error={includes(tempMandatory, 'startTime')}
                        />
                    </div>
                    <div className='row date-time'>
                        <TimePickerComp
                            label='End Time'
                            value={dataSelected.endTime}
                            onChange={this.handleDateTimeChange('endTime')}
                            error={includes(tempMandatory, 'endTime')}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancel</Button>
                    <Button onClick={this.handleModalSave(dataSelected)} color="primary">Save</Button>
                </DialogActions>
            </Dialog >
        );
    }

}

export default ModalDataChange