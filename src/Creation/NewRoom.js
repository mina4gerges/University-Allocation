import React, { Component } from 'react';
import { Button, Label, Input, Card, CardBody } from 'reactstrap';
import { filter, map, includes, isEmpty, remove, startsWith } from 'lodash';
import Container from '@material-ui/core/Container';
import InputMask from 'react-input-mask';
// import Select from "react-virtualized-select";

import { globalMsg } from "../Data/globalMsg";
// import { roomStatusOptions } from "../Data/CreationData";
import DateTimePickerComp from '../Components/DateTimePickerComp';
import axios from "axios";
import { DB_Link } from '../global';
import SnackBarComp from '../Components/SnackBarCom';
class NewRoom extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roomID: "",
            roomName: null,
            roomCapacity: null,
            roomFloor: null,
            // roomStatus: null,
            roomStatus: 'vacant',
            roomHoldUntil: null,
            openSnackBar: false,
            tempMandatory: [],
            // roomStatusOptions
        };

        this.mandatory = [
            // 'roomID',
            'roomName',
            'roomCapacity',
            'roomFloor',
            'roomStatus',
        ];

        this.toSave = [
            'roomID',
            'roomName',
            'roomCapacity',
            'roomFloor',
            'roomStatus',
        ];
    }

    componentDidMount() {
        const CancelToken = axios.CancelToken;
        this.CancelToken = CancelToken.source();
    }

    componentWillUnmount() {
        //cancel axios request
        if (this.CancelToken) {
            this.CancelToken.cancel('Request canceled by the user.');
            this.CancelToken = undefined;
        }
    }
    handleTextChange = event => {
        let { name, value } = event.target;
        this.handleRemoveMandatory(name);
        this.setState({ [name]: value });
    }

    handleSelectChange = name => value => {
        let roomHoldUntil = null;
        this.handleRemoveMandatory(name);
        this.handleAddRemoveMandatoryValue(value);
        if (name === 'roomStatus' && value && value.roomHoldUntil) roomHoldUntil = new Date();
        this.setState({ [name]: value.value, roomHoldUntil });//TODO
    }

    handleAddRemoveMandatoryValue = value => {
        if (value && value.roomHoldUntil && !includes(this.mandatory, 'roomHoldUntil')) {
            this.mandatory.push('roomHoldUntil');
            this.toSave.push('roomHoldUntil');
        }
        else if (!value || !value.roomHoldUntil) {
            remove(this.mandatory, value => { return value === 'roomHoldUntil' });
            remove(this.toSave, value => { return value === 'roomHoldUntil' });
            this.setState({ roomHoldUntil: null });
        }
    }

    handleRemoveMandatory = name => {
        let { tempMandatory } = this.state;
        tempMandatory = filter(tempMandatory, val => { return val !== name });
        this.setState({ tempMandatory, errorMsg: null })
    }

    handleMandatory = () => {
        let tempMandatory = [];
        let errorMsg = null;
        map(this.state, (val, key) => {
            if (!val && includes(this.mandatory, key)) tempMandatory.push(key);
        })
        if (!isEmpty(tempMandatory)) errorMsg = globalMsg.mandatory;
        this.setState({ tempMandatory, errorMsg });
        return tempMandatory;
    }

    handleSave = () => {
        let tempMandatory = this.handleMandatory();
        this.setState({ openSnackBar: true });

        if (isEmpty(tempMandatory)) {//validation
            let savedValue = {};
            map(this.toSave, val => {
                savedValue = { ...savedValue, [val]: typeof (this.state[val]) === 'object' && this.state[val] ? this.state[val].value : this.state[val] };//TODO
            })
            const params = { ...savedValue };
            axios({
                method: 'post',
                url: `${DB_Link}SaveRoom`,
                data: JSON.stringify(params),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                // cancelToken: this.CancelToken.token
            }).then((response) => {
                let res = response.data.SaveRoomResult;
                this.setState({ errorMsg: res })
            }).catch((error) => {
                // console.log('error', error);
            });
        }
    }

    handleClear = () => {
        let tempState = this.state;
        map(this.toSave, val => {
            tempState[val] = null
        })
        this.handleAddRemoveMandatoryValue();
        this.setState({ ...tempState, errorMsg: null, tempMandatory: null })
    }

    dateTimePickerValue = (name, value) => this.setState({ [name]: value });

    onCloseSnackBar = () => this.setState({ openSnackBar: false })

    render() {
        // console.log('state', this.state)
        let { roomName, roomCapacity, roomFloor, roomStatus, roomHoldUntil,
            //roomStatusOptions, 
            tempMandatory, errorMsg, openSnackBar } = this.state;
        return (
            <div>
                <Container maxWidth="sm" className='center'>
                    <Card>
                        <CardBody>
                            <div className="row" style={{ textAlign: 'center' }}>
                                <Label className="col-12">
                                    <b>Room Detail</b>
                                </Label>
                            </div>
                            {/* <div className="row" style={{ display: errorMsg ? 'block' : 'none', textAlign: 'center' }}>
                                <Alert color="danger" >
                                    {errorMsg}
                                </Alert>
                            </div> */}
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Name</Label>
                                <Input
                                    type="text"
                                    className={`col-8 ${includes(tempMandatory, 'roomName') ? 'alert-danger' : ''}`}
                                    name="roomName"
                                    value={roomName ? roomName : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Capacity</Label>
                                <InputMask
                                    className={`col-8 form-control ${includes(tempMandatory, 'roomCapacity') ? 'alert-danger' : ''}`}
                                    mask="999"
                                    maskChar=" "
                                    name="roomCapacity"
                                    value={roomCapacity ? roomCapacity : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Floor Name</Label>
                                <Input
                                    type="text"
                                    className={`col-8 ${includes(tempMandatory, 'roomFloor') ? 'alert-danger' : ''}`}
                                    name="roomFloor"
                                    value={roomFloor ? roomFloor : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            {/* <div className="row" style={{ marginBottom: "7px" }}>
                                <Label className="col-4">Status</Label>
                                <Select
                                    className={`col-8 semestre ${includes(tempMandatory, 'roomStatus') ? 'alert-danger' : ''}`}
                                    name="roomStatus"
                                    value={roomStatus}
                                    options={roomStatusOptions}
                                    onChange={this.handleSelectChange('roomStatus')}
                                />
                            </div> */}
                            {
                                roomStatus && roomStatus.roomHoldUntil &&
                                <div className="row" style={{ marginBottom: "7px" }}>
                                    <Label className="col-4">Hold Until</Label>
                                    <div className={`col-8  ${includes(tempMandatory, 'roomHoldUntil') ? 'alert-danger' : ''}`} style={{ paddingLeft: "3px" }}>
                                        <DateTimePickerComp
                                            name='roomHoldUntil'
                                            dateTimePickerValue={this.dateTimePickerValue}
                                            value={roomHoldUntil}
                                        />
                                    </div>
                                </div>
                            }
                            <div className="row">
                                <div className='col-4'></div>
                                <div className='col-4'>
                                    <Button onClick={this.handleSave} color='success'>SAVE</Button>
                                </div>
                                <div className='col-4'>
                                    <Button onClick={this.handleClear} color='secondary'>CLEAR</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <SnackBarComp
                        open={openSnackBar}
                        onClose={this.onCloseSnackBar}
                        message={errorMsg}
                        color={startsWith(errorMsg, 'Successfully Saved') ? 'success' : 'error'}
                    />
                </Container>
            </div>
        )
    }
}

export default NewRoom;
