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
import { cloneDeep, map } from 'lodash';
import { roomName, roomStatus, teacherName, courseName } from '../Data/DashBoardData';
import TimePickerComp from '../Components/TimePickerComp';
import DatePcikerComp from '../Components/DatePickerComp';
class ModalDataChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName,
            roomStatus,
            teacherName,
            courseName,
            dataSelected: cloneDeep(this.props.dataSelected),
        }
    }

    handleChange = event => {
        let { name, value } = event.target;
        let { dataSelected } = this.state;
        dataSelected[name] = value;
        this.setState({ dataSelected })
    }

    handleDateTimeChange = name => value => {
        let { dataSelected } = this.state;
        dataSelected[name] = value;
        this.setState({ dataSelected })
    }


    render() {
        let { onClose, open, handleModalSave } = this.props;
        let { dataSelected, roomStatus, roomName, teacherName, courseName } = this.state;
        let mode = 'edit';
        let headerLabel = 'New Class';
        if (!dataSelected.class_ID) mode = 'addNew';
        if (dataSelected.course) headerLabel = dataSelected.course.toUpperCase();
        if (dataSelected.teacher) headerLabel = dataSelected.teacher;
        if (dataSelected.course && dataSelected.teacher) headerLabel = dataSelected.course.toUpperCase() + " (" + dataSelected.teacher + ")";

        return (
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" className='modal-data-change' >
                <DialogContent>
                    <DialogContentText style={{ textAlign: 'center' }} title={headerLabel === 'New Class' ? 'New Class' : 'Course And Teacher Name'}>
                        {headerLabel}
                    </DialogContentText>
                    {mode === 'addNew' &&
                        <div>
                            <FormControl style={{ width: '100%' }} className='row'>
                                <InputLabel htmlFor="age-simple">Teacher</InputLabel>
                                <Select
                                    value={dataSelected.teacher ? dataSelected.teacher : ''}
                                    onChange={this.handleChange}
                                    name='teacher'
                                >
                                    {map(teacherName, teacherValue => { return (<MenuItem key={teacherValue.value} value={teacherValue.value} >{teacherValue.label}</MenuItem>) })}
                                </Select>
                            </FormControl>
                            <FormControl style={{ width: '100%' }} className='row'>
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
                    <FormControl style={{ width: '100%' }} className='row'>
                        <InputLabel htmlFor="age-simple">Room</InputLabel>
                        <Select
                            value={dataSelected.room}
                            onChange={this.handleChange}
                            name='room'
                        >
                            {map(roomName, roomValue => { return (<MenuItem key={roomValue.value} value={roomValue.value} >{roomValue.label}</MenuItem>) })}
                        </Select>
                    </FormControl>
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
                    <div className='row date-time'>
                        <DatePcikerComp
                            label='Date'
                            value={dataSelected.date}
                            onChange={this.handleDateTimeChange('date')}
                        />
                    </div>
                    <div className='row date-time'>
                        <TimePickerComp
                            label='Start Time'
                            value={dataSelected.startTime}
                            onChange={this.handleDateTimeChange('startTime')}
                        />
                    </div>
                    <div className='row date-time'>
                        <TimePickerComp
                            label='End Time'
                            value={dataSelected.endTime}
                            onChange={this.handleDateTimeChange('endTime')}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancel</Button>
                    <Button onClick={handleModalSave(dataSelected)} color="primary">Save</Button>
                </DialogActions>
            </Dialog >
        );
    }

}

export default ModalDataChange