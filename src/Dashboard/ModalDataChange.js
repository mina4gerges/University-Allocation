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
import { cloneDeep, map, includes, filter, find } from 'lodash';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid'
import isBefore from 'date-fns/isBefore';
// import { roomName, roomStatus, teacherName, courseName } from '../Data/DashBoardData';
import { roomStatus } from '../Data/DashBoardData';
// import { roomName, teacherName, courseName } from '../Data/DashBoardData';
import TimePickerComp from '../Components/TimePickerComp';
import DatePcikerComp from '../Components/DatePickerComp';
import { globalMsg } from '../Data/globalMsg';
class ModalDataChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // roomName,
            roomStatus,
            // teacherName,
            // courseName,
            tempMandatory: [],
            timeErrorMsg: {},
            dataSelected: cloneDeep(this.props.dataSelected),
        }

        this.mode = !this.props.dataSelected.class_ID ? 'addNew' : 'edit';

        this.toSave = [
            'room_ID',
            'coursDate',
            'startTime',
            'endTime',
        ];

        this.mandatory = [
            'room_ID',
            'coursDate',
            'startTime',
            'endTime',
        ];

        if (this.mode === 'addNew') {
            this.toSave.push('teacher_ID');
            this.toSave.push('cours_ID');

            this.mandatory.push('teacher_ID');
            this.mandatory.push('cours_ID');
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
        let timeErrorMsg = {};
        let isValidTime = true;
        dataSelected[name] = value;
        tempMandatory = filter(tempMandatory, val => { return val !== name });
        if (name !== 'coursDate' && value && isValid(value) && dataSelected.coursDate && isValid(dataSelected.coursDate)) {
            dataSelected[name] = new Date(format(dataSelected.coursDate, 'yyy-MM-dd') + " " + format(value, 'hh:mm a'))
        }

        if (name === 'startTime' || name === 'endTime') isValidTime = this.handleValidationTime(name, value, dataSelected);

        if (!isValidTime) timeErrorMsg = { ...timeErrorMsg, [name]: globalMsg[`${name}ErrorMsg`] }
        else if (timeErrorMsg[name]) delete timeErrorMsg[name];

        this.setState({ dataSelected, tempMandatory, timeErrorMsg });
    }

    handleValidationTime = (name, value, dataSelected) => {
        let isValidTime = true;
        if (name === 'startTime') {
            if (value && isValid(value) && dataSelected.endTime && isValid(dataSelected.endTime)) {
                let startTime = value;
                let endTime = dataSelected.endTime;
                isValidTime = isBefore(new Date(format(new Date(), 'yyy-MM-dd') + " " + format(startTime, 'hh:mm a')), new Date(format(new Date(), 'yyy-MM-dd') + " " + format(endTime, 'hh:mm a')));
            }
        }
        else if (name === 'endTime') {
            if (value && isValid(value) && dataSelected.startTime && isValid(dataSelected.startTime)) {
                let startTime = dataSelected.startTime;
                let endTime = value;
                isValidTime = isBefore(new Date(format(new Date(), 'yyy-MM-dd') + " " + format(startTime, 'hh:mm a')), new Date(format(new Date(), 'yyy-MM-dd') + " " + format(endTime, 'hh:mm a')));
            }
        }
        return isValidTime;
    }


    handleModalSave = dataSelected => e => {
        let countMandatory = 0;
        let countPendingChanges = 0;

        let tempMandatory = [];
        map(this.toSave, val => {
            if (!dataSelected[val]) {
                countMandatory++;
                tempMandatory.push(val);
            }
        })

        let allDateTimeValid = isValid(dataSelected.coursDate) && isValid(dataSelected.endTime) && isValid(dataSelected.startTime);

        if (!allDateTimeValid && countMandatory === 0) countPendingChanges++;//if no mandatory and at least one date or time is not valid --> prevent saving

        if (countMandatory === 0 && countPendingChanges === 0) this.props.handleModalSave(dataSelected)(e);
        else this.props.handleErrorMsg(countPendingChanges > 0 ? globalMsg.pendingChanges : globalMsg.mandatory)
        this.setState({ tempMandatory });
    }

    render() {
        let { onClose, open, roomNameOption, teacherNameOption, courseNameOption } = this.props;
        let { dataSelected, tempMandatory, timeErrorMsg, roomStatus } = this.state;
        let headerLabel = 'New Class';
        if (dataSelected.cours_ID) headerLabel = find(courseNameOption, { value: dataSelected.cours_ID }).label.toUpperCase();
        if (dataSelected.teacher_ID) headerLabel = find(teacherNameOption, { value: dataSelected.teacher_ID }).label;
        if (dataSelected.cours_ID && dataSelected.teacher_ID) headerLabel = find(courseNameOption, { value: dataSelected.cours_ID }).label.toUpperCase() + " (" + find(teacherNameOption, { value: dataSelected.teacher_ID }).label + ")";

        return (
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" className='modal-data-change' >
                <DialogContent>
                    <DialogContentText style={{ textAlign: 'center' }} title={headerLabel === 'New Class' ? 'New Class' : 'Course And Teacher Name'}>
                        {headerLabel}
                    </DialogContentText>
                    {this.mode === 'addNew' &&
                        <div>
                            <FormControl style={{ width: '100%' }} className='row' error={includes(tempMandatory, 'teacher_ID')}>
                                <InputLabel htmlFor="age-simple" >Teacher</InputLabel>
                                <Select
                                    value={dataSelected.teacher_ID ? dataSelected.teacher_ID : ''}
                                    onChange={this.handleChange}
                                    name='teacher_ID'
                                >
                                    {map(teacherNameOption, teacherValue => { return (<MenuItem key={teacherValue.value} value={teacherValue.value} >{teacherValue.label}</MenuItem>) })}
                                </Select>
                            </FormControl>
                            <FormControl style={{ width: '100%' }} className='row' error={includes(tempMandatory, 'cours_ID')}>
                                <InputLabel htmlFor="age-simple">Course</InputLabel>
                                <Select
                                    value={dataSelected.cours_ID ? dataSelected.cours_ID : ''}
                                    onChange={this.handleChange}
                                    name='cours_ID'
                                >
                                    {map(courseNameOption, courseValue => { return (<MenuItem key={courseValue.value} value={courseValue.value} >{courseValue.label}</MenuItem>) })}
                                </Select>
                            </FormControl>
                        </div>
                    }
                    <FormControl style={{ width: '100%' }} className='row' error={includes(tempMandatory, 'room_ID')} disabled={this.mode === 'addNew'}>
                        <InputLabel htmlFor="age-simple">Room</InputLabel>
                        <Select
                            value={dataSelected.room_ID ? dataSelected.room_ID : ''}
                            onChange={this.handleChange}
                            name='room_ID'
                        >
                            {map(roomNameOption, roomValue => { return (<MenuItem key={roomValue.value} value={roomValue.value} >{roomValue.label}</MenuItem>) })}
                        </Select>
                    </FormControl>
                    {this.mode === 'edit' &&
                        <FormControl style={{ width: '100%' }} className='row'>
                            <InputLabel htmlFor="age-simple">Status</InputLabel>
                            <Select
                                value={dataSelected.status}
                                onChange={this.handleChange}
                                name='status'
                            >
                                {map(roomStatus, statusName => { return (<MenuItem key={statusName.value} value={statusName.value} >{statusName.label}</MenuItem>) })}
                            </Select>
                        </FormControl>
                    }
                    <div className='row date-time'>
                        <DatePcikerComp
                            label='Date'
                            value={dataSelected.coursDate}
                            onChange={this.handleDateTimeChange('coursDate')}
                            error={includes(tempMandatory, 'coursDate')}
                        />
                    </div>
                    <div className='row date-time'>
                        <TimePickerComp
                            label='Start Time'
                            value={dataSelected.startTime}
                            onChange={this.handleDateTimeChange('startTime')}
                            error={includes(tempMandatory, 'startTime')}
                            timeErrorMsg={timeErrorMsg.startTime}
                        />
                    </div>
                    <div className='row date-time'>
                        <TimePickerComp
                            label='End Time'
                            value={dataSelected.endTime}
                            onChange={this.handleDateTimeChange('endTime')}
                            error={includes(tempMandatory, 'endTime')}
                            timeErrorMsg={timeErrorMsg.endTime}
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