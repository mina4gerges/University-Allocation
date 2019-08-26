import React, { Component } from 'react';
import { Button, Label, Input, Alert, Card, CardBody } from 'reactstrap';
import { filter, map, includes, isEmpty, remove } from 'lodash';
import InputMask from 'react-input-mask';
import ReactPhoneInput from 'react-phone-input-2';
import moment from 'moment';

import globalMsg from "../Data/globalMsg";
import DateTimePickerComp from '../Components/DateTimePickerComp';

class NewTeacher extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teacherID: null,
            teacherName: null,
            teacherLastName: null,
            teacherPhoneNumber: null,
            teacherStatus: null,
            teacherHoldUntil: null,
            tempMandatory: [],
            teacherStatusOptions: [
                { label: "Available", value: "Available", "teacherHoldUntil": false },
                { label: "Closed Permanently", value: "Closed Permanently", "teacherHoldUntil": false },
                { label: "Closed temporarily", value: "Closed temporarily", "teacherHoldUntil": true },
                { label: "Closed For Maintenance", value: "For Maintenance", "teacherHoldUntil": true },
            ],
        };

        this.mandatory = [
            'teacherID',
            'teacherName',
            'teacherLastName',
            'teacherPhoneNumber',
            'teacherStatus',
        ];

        this.toSave = [
            'teacherID',
            'teacherName',
            'teacherLastName',
            'teacherPhoneNumber',
            'teacherStatus',
        ];
    }

    handleTextChange = event => {
        let { name, value } = event.target;
        this.handleRemoveMandatory(name);
        this.setState({ [name]: value });
    }

    handleSelectChange = name => value => {
        let teacherHoldUntil = null;
        this.handleRemoveMandatory(name);
        this.handleAddRemoveMandatoryValue(value);
        if (name === 'teacherStatus' && value && value.teacherHoldUntil) teacherHoldUntil = new moment();
        this.setState({ [name]: value, teacherHoldUntil });
    }

    handleAddRemoveMandatoryValue = value => {
        if (value && value.teacherHoldUntil && !includes(this.mandatory, 'teacherHoldUntil')) {
            this.mandatory.push('teacherHoldUntil');
            this.toSave.push('teacherHoldUntil');
        }
        else if (!value || !value.teacherHoldUntil) {
            remove(this.mandatory, value => { return value === 'teacherHoldUntil' });
            remove(this.toSave, value => { return value === 'teacherHoldUntil' });
            this.setState({ teacherHoldUntil: null });
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
    }

    handleSave = () => {
        this.handleMandatory();
        let savedValue = {};
        map(this.toSave, val => {
            savedValue = { ...savedValue, [val]: this.state[val] };
        })
        console.log('savedValue', savedValue)
        return savedValue;
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

    render() {
        let { teacherID, teacherName, teacherLastName, teacherPhoneNumber, teacherStatus, teacherHoldUntil, teacherStatusOptions, tempMandatory, errorMsg } = this.state;
        return (
            <div>
                <Card>
                    <CardBody>
                        <div className="row" style={{ textAlign: 'center' }}>
                            <Label className="col-12">
                                <b>Teacher Detail</b>
                            </Label>
                        </div>
                        <div className="row" style={{ display: errorMsg ? 'block' : 'none', textAlign: 'center' }}>
                            <Alert color="danger" >
                                {errorMsg}
                            </Alert>
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <Label className="col-4">ID</Label>
                            <InputMask
                                className={`col-8 form-control ${includes(tempMandatory, 'teacherID') ? 'alert-danger' : ''}`}
                                mask="999"
                                maskChar=" "
                                name="teacherID"
                                value={teacherID ? teacherID : ''}
                                onChange={this.handleTextChange}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <Label className="col-4">Name</Label>
                            <Input
                                type="text"
                                className={`col-8 ${includes(tempMandatory, 'teacherName') ? 'alert-danger' : ''}`}
                                name="teacherName"
                                value={teacherName ? teacherName : ''}
                                onChange={this.handleTextChange}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <Label className="col-4">Last Name</Label>
                            <Input
                                type="text"
                                className={`col-8 ${includes(tempMandatory, 'teacherLastName') ? 'alert-danger' : ''}`}
                                name="teacherLastName"
                                value={teacherLastName ? teacherLastName : ''}
                                onChange={this.handleTextChange}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: "7px" }}>
                            <Label className="col-4">Phone Number</Label>
                            {/* <ReactPhoneInput */}
                            {/* defaultCountry={'us'} */}
                            {/* value={teacherPhoneNumber} */}
                            {/* name='teacherPhoneNumber' */}
                            {/* onChange={this.handleTextChange} */}
                            {/* /> */}
                        </div>
                        {
                            teacherStatus && teacherStatus.teacherHoldUntil &&
                            <div className="row" style={{ marginBottom: "7px" }}>
                                <Label className="col-4">Hold Until</Label>
                                <div className={`col-8  ${includes(tempMandatory, 'teacherHoldUntil') ? 'alert-danger' : ''}`} style={{ paddingLeft: "3px" }}>
                                    <DateTimePickerComp
                                        name='teacherHoldUntil'
                                        dateTimePickerValue={this.dateTimePickerValue}
                                        value={teacherHoldUntil}
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
            </div>
        )
    }
}

export default NewTeacher;
