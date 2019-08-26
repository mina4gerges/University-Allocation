import React, { Component } from 'react';
import { Button, Label, Input, Alert, Card, CardBody } from 'reactstrap';
import { filter, map, includes, isEmpty } from 'lodash';
import InputMask from 'react-input-mask';
import Select from "react-virtualized-select";

import globalMsg from "../Data/globalMsg";

class NewCourse extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courseName: null,
            courseCode: null,
            numberOfCredits: null,
            numberOfHours: null,
            semester: null,
            courseStatus: null,
            coursePrice: null,
            currency: null,
            errorMsg: null,
            tempMandatory: [],
            semesterOptions: [{ label: 1, value: 1 }, { label: 2, value: 2 }],
            statusOptions: [{ label: "Open", value: "Open" }, { label: "Closed", value: "Closed" }],
            currencyOptions: [{ label: "L.L", value: "L.L" }, { label: "$", value: "$" }],
        };

        this.mandatory = [
            'courseName',
            'courseCode',
            'numberOfCredits',
            'numberOfHours',
            'semester',
            'courseStatus',
            'coursePrice',
            'currency'
        ];

        this.toSave = [
            'courseName',
            'courseCode',
            'numberOfCredits',
            'numberOfHours',
            'semester',
            'courseStatus',
            'coursePrice',
            'currency'
        ];

    }

    handleTextChange = event => {
        let { name, value } = event.target;
        this.handleRemoveMandatory(name);
        this.setState({ [name]: value });
    }

    handleSelectChange = name => value => {
        this.handleRemoveMandatory(name);
        this.setState({ [name]: value })
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
        this.setState({ ...tempState, errorMsg: null, tempMandatory: null })
    }

    render() {

        let { courseName, courseCode, numberOfCredits, numberOfHours, semester, semesterOptions,
            courseStatus, statusOptions, coursePrice, currency, currencyOptions, tempMandatory, errorMsg } = this.state;

        return (
            <div>
                <Card>
                    <CardBody>
                        <div className="row" style={{ textAlign: 'center' }}>
                            <Label className="col-12">
                                <b>Course Details</b>
                            </Label>
                        </div>
                        <div className="row" style={{ display: errorMsg ? 'block' : 'none', textAlign: 'center' }}>
                            <Alert color="danger" >
                                {errorMsg}
                            </Alert>
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <Label className="col-4">Code</Label>
                            <Input
                                type="text"
                                className={`col-8 ${includes(tempMandatory, 'courseCode') ? 'alert-danger' : ''}`}
                                name="courseCode"
                                value={courseCode ? courseCode : ''}
                                onChange={this.handleTextChange}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <Label className="col-4">Name</Label>
                            <Input
                                type="text"
                                className={`col-8 ${includes(tempMandatory, 'courseName') ? 'alert-danger' : ''}`}
                                name="courseName"
                                value={courseName ? courseName : ''}
                                onChange={this.handleTextChange}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <Label className="col-4">Number Of Credits</Label>
                            <InputMask
                                className={`col-8 form-control ${includes(tempMandatory, 'numberOfCredits') ? 'alert-danger' : ''}`}
                                mask="99"
                                maskChar=" "
                                name="numberOfCredits"
                                value={numberOfCredits ? numberOfCredits : ''}
                                onChange={this.handleTextChange}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <Label className="col-4">Number Of Hours</Label>
                            <InputMask
                                className={`col-8 form-control ${includes(tempMandatory, 'numberOfHours') ? 'alert-danger' : ''}`}
                                mask="999"
                                maskChar=" "
                                name="numberOfHours"
                                value={numberOfHours ? numberOfHours : ''}
                                onChange={this.handleTextChange}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <Label className="col-4">Course Price</Label>
                            <InputMask
                                className={`col-4 form-control ${includes(tempMandatory, 'coursePrice') ? 'alert-danger' : ''}`}
                                mask="999"
                                maskChar=" "
                                name="coursePrice"
                                value={coursePrice ? coursePrice : ''}
                                onChange={this.handleTextChange}
                            />
                            <div className='col-4' style={{ paddingRight: '0px' }}>
                                <Select
                                    className={`semestre ${includes(tempMandatory, 'currency') ? 'alert-danger' : ''}`}
                                    name="semester"
                                    placeholder="Currency"
                                    value={currency}
                                    options={currencyOptions}
                                    onChange={this.handleSelectChange('currency')}
                                />
                            </div>
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <Label className="col-4">Semester</Label>
                            <Select
                                className={`col-8 semestre ${includes(tempMandatory, 'semester') ? 'alert-danger' : ''}`}
                                name="semester"
                                value={semester}
                                options={semesterOptions}
                                onChange={this.handleSelectChange('semester')}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <Label className="col-4">Course Status</Label>
                            <Select
                                className={`col-8 semestre ${includes(tempMandatory, 'courseStatus') ? 'alert-danger' : ''}`}
                                name="courseStatus"
                                value={courseStatus}
                                options={statusOptions}
                                onChange={this.handleSelectChange('courseStatus')}
                            />
                        </div>
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

export default NewCourse;
