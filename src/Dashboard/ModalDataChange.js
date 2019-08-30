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
import { roomName, roomStatus } from '../Data/DashBoardData';
import TimePickerComp from '../Components/TimePickerComp';
import DatePcikerComp from '../Components/DatePickerComp';
class ModalDataChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSelected: cloneDeep(this.props.dataSelected),
        }
    }

    handleChange = event => {
        let { name, value } = event.target;
        let { dataSelected } = this.state;
        dataSelected[name] = value;
        this.setState({ dataSelected })
    }

    x = name => value => {
        let { dataSelected } = this.state;
        dataSelected[name] = value;
        this.setState({ dataSelected })
    }


    render() {
        let { onClose, open, handleModalSave } = this.props;
        let { dataSelected } = this.state;
        return (
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" className='modal-data-change'>
                <DialogContent>
                    {dataSelected.çourse && dataSelected.teacher &&
                        <DialogContentText style={{ textAlign: 'center' }}>
                            {`${dataSelected.çourse} (${dataSelected.teacher})`}
                        </DialogContentText>
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
                    <div className='raw'>
                        <DatePcikerComp
                            label='Date'
                            value={dataSelected.date}
                            onChange={this.x('date')}
                        />
                    </div>
                    <div className='raw'>
                        <TimePickerComp
                            label='Start Time'
                            value={dataSelected.startTime}
                            onChange={this.x('startTime')}
                        />
                    </div>
                    <div className='raw'>
                        <TimePickerComp
                            label='End Time'
                            value={dataSelected.endTime}
                            onChange={this.x('endTime')}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancel</Button>
                    <Button onClick={handleModalSave(dataSelected)} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        );
    }

}

export default ModalDataChange