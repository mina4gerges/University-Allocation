import React, { Component } from 'react';
import { Button, Label, Input, Alert, Card, CardBody } from 'reactstrap';
import Container from '@material-ui/core/Container';
import { filter, map, includes, isEmpty } from 'lodash';
import InputMask from 'react-input-mask';
import Select from "react-virtualized-select";
import ReactPhoneInput from 'react-phone-input-2';
import AlgoliaPlaces from 'algolia-places-react';

import globalMsg from "../Data/globalMsg";
import InputComp from "../Components/InputComp";
import validateEmail from '../GlobalFunctions';
import { teacherMajorMajorOptions } from '../Data/CreationData';
import 'react-phone-input-2/dist/style.css';

class NewTeacher extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teacherID: null,
            teacherName: null,
            teacherLastName: null,
            teacherPhoneNumber: null,
            teacherEmail: null,
            teacherMajor: null,
            teacherAddress: null,

            tempMandatory: [],
            tempInvalid: [],
            teacherMajorMajorOptions,
        };

        this.mandatory = [
            'teacherID',
            'teacherName',
            'teacherLastName',
            'teacherPhoneNumber',
            'teacherEmail',
            'teacherMajor',
            'teacherAddress'
        ];

        this.toSave = [
            'teacherID',
            'teacherName',
            'teacherLastName',
            'teacherPhoneNumber',
            'teacherEmail',
            'teacherMajor',
            'teacherAddress'
        ];
    }

    handleTextChange = event => {
        let { name, value } = event.target;
        this.handleRemoveMandatory(name);
        this.setState({ [name]: value ? value : null });
    }

    handleTextBlur = event => {
        let { name, value } = event.target;
        if (name === 'teacherEmail') {
            let { tempInvalid } = this.state;
            tempInvalid = this.handleInvalid(name, value, tempInvalid);
            this.setState({ tempInvalid });
        }
    }

    handlePhoneChange = name => number => this.setState({ [name]: number });

    handleSelectChange = name => value => {
        this.handleRemoveMandatory(name);
        this.setState({ [name]: value });
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

    handleInvalid = (name, value, tempInvalid) => {
        if (value && !validateEmail(value) && !includes(tempInvalid, name)) tempInvalid.push(name);
        else if (!value || validateEmail(value)) tempInvalid = filter(tempInvalid, val => { return val !== name });
        return tempInvalid;
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


    handleAddressChange = query => {
        console.log('query', query)
    }

    render() {
        let { teacherID, teacherName, teacherLastName, teacherPhoneNumber,
            teacherEmail, teacherMajor, teacherAddress, teacherMajorMajorOptions, tempMandatory, tempInvalid, errorMsg } = this.state;
        console.log('this.state', this.state);
        return (
            <div>
                <Container maxWidth="sm">
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
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Major</Label>
                                <Select
                                    className={`col-8 semestre ${includes(tempMandatory, 'teacherMajor') ? 'alert-danger' : ''}`}
                                    name="teacherMajor"
                                    value={teacherMajor}
                                    options={teacherMajorMajorOptions}
                                    onChange={this.handleSelectChange('teacherMajor')}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Address</Label>
                                <div className='col-8' style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                                    <AlgoliaPlaces
                                        placeholder=''
                                        name='teacherAddress'
                                        onChange={this.handleAddressChange}
                                        className={includes(tempMandatory, 'teacherAddress') ? 'alert-danger testing1' : 'testing2'}
                                        options={{
                                            appId: 'plV842AJCU0M',
                                            apiKey: ~ '6755273aa0e09c361d3d3f873af3326d',
                                            language: 'en',
                                            // language: 'sv', //result in arabic
                                            countries: ['lb'],
                                            type: 'city'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "7px" }}>
                                <Label className="col-4">Phone Number</Label>
                                <div className={`col-8 phone-number ${includes(tempMandatory, 'teacherPhoneNumber') ? 'alert-danger' : ''}`} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                    <ReactPhoneInput
                                        defaultCountry='lb'
                                        value={teacherPhoneNumber ? teacherPhoneNumber : ''}
                                        onChange={this.handlePhoneChange('teacherPhoneNumber')}
                                        inputExtraProps={{
                                            name: 'teacherPhoneNumber',
                                            // required: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Email</Label>
                                <div className='col-8'>
                                    <InputComp
                                        name='teacherEmail'
                                        value={teacherEmail ? teacherEmail : ''}
                                        className={includes(tempMandatory, 'teacherEmail') ? 'alert-danger' : ''}
                                        onChange={this.handleTextChange}
                                        onBlur={this.handleTextBlur}
                                        errorMsg={includes(tempInvalid, 'teacherEmail') ? globalMsg.mail : null}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Major</Label>
                                <Select
                                    className={`col-8 semestre ${includes(tempMandatory, 'teacherMajor') ? 'alert-danger' : ''}`}
                                    name="teacherMajor"
                                    value={teacherMajor}
                                    options={teacherMajorMajorOptions}
                                    onChange={this.handleSelectChange('teacherMajor')}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Adress</Label>
                                <div className='col-8'>

                                </div>
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
                </Container>
            </div>
        )
    }
}

export default NewTeacher;
