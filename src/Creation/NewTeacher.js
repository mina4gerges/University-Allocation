import React, { Component } from 'react';
import { Button, Label, Input, Alert, Card, CardBody } from 'reactstrap';
import Container from '@material-ui/core/Container';
import { filter, map, includes, isEmpty, startsWith } from 'lodash';
import InputMask from 'react-input-mask';
import Select from "react-virtualized-select";
import ReactPhoneInput from 'react-phone-input-2';
import AlgoliaPlaces from 'algolia-places-react';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

import { globalMsg } from "../Data/globalMsg";
import InputComp from "../Components/InputComp";
import { validateEmail } from '../GlobalFunctions';
import { teacher_DiplomaOptions, user_TypeOptions, user_StatusOptions } from '../Data/CreationData';
import 'react-phone-input-2/dist/style.css';
import SnackBarComp from '../Components/SnackBarCom';
import { DB_Link } from '../global';
//ciploma, experties, name, lastname, phone, email, logo, userame, pass, type(user3ade aw admin), status(active or not)
class NewTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teacher_ID: '',
            teacher_Name: null,
            teacher_familyName: null,
            user_PhoneNumber: null,
            teacher_Diploma: null,
            teacher_Address: null,
            // teacher_Address: '',
            teacher_Expertise: null,
            teacher_Code: null,
            user_Name: null,
            user_Email: null,
            user_PhoneNumber: null,
            user_Password: null,
            user_logo: '/static/images/avatar/1.jpg',
            user_Type: null,
            user_Status: null,
            openSnackBar: false,

            tempMandatory: [],
            tempInvalid: [],
            teacher_DiplomaOptions,
            user_TypeOptions,
            user_StatusOptions,
        };

        this.mandatory = [
            // 'teacher_ID',
            'teacher_Name',
            'teacher_familyName',
            'teacher_Diploma',
            'teacher_Address',
            'teacher_Expertise',
            'teacher_Code',
            'user_Name',
            'user_PhoneNumber',
            'user_Email',
            'user_Password',
            'user_logo',
            'user_Type',
            'user_Status',
        ];

        this.toSave = [
            'teacher_ID',
            'teacher_Name',
            'teacher_familyName',
            'teacher_Diploma',
            'teacher_Address',
            'teacher_Expertise',
            'teacher_Code',
            'user_Name',
            'user_PhoneNumber',
            'user_Email',
            'user_Password',
            'user_logo',
            'user_Type',
            'user_Status',
        ];
    }

    handleTextChange = event => {
        let { name, value } = event.target;
        this.handleRemoveMandatory(name);
        this.setState({ [name]: value ? value : null });
    }

    handleTextBlur = event => {
        let { name, value } = event.target;
        if (name === 'user_Email') {
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
        return tempMandatory
    }

    handleInvalid = (name, value, tempInvalid) => {
        if (value && !validateEmail(value) && !includes(tempInvalid, name)) tempInvalid.push(name);
        else if (!value || validateEmail(value)) tempInvalid = filter(tempInvalid, val => { return val !== name });
        return tempInvalid;
    }

    handleSave = () => {
        let tempMandatory = this.handleMandatory();
        this.setState({ openSnackBar: true })
        let savedValue = {};
        map(this.toSave, val => {
            savedValue = {
                ...savedValue,
                [val]: typeof (this.state[val]) === 'object' &&
                    this.state[val] ?
                    (val === 'teacher_Address' ? JSON.stringify(this.state[val]) : this.state[val].value) :
                    this.state[val]
            };
        })
        if (isEmpty(tempMandatory)) {//validation
            const params = { ...savedValue };

            axios({
                method: 'post',
                url: `${DB_Link}SaveTeacher`,
                data: JSON.stringify(params),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                // cancelToken: this.CancelToken.token
            }).then((response) => {
                let res = response.data.SaveTeacherResult;
                this.setState({ errorMsg: res })
            }).catch((error) => {
            });
        }
    }

    handleClear = () => {
        let tempState = this.state;
        map(this.toSave, val => {
            tempState[val] = null
        })
        this.setState({ ...tempState, errorMsg: null, tempMandatory: null })
    }


    handleAddressChange = query => {
        this.setState({ teacher_Address: query })
    }

    onCloseSnackBar = () => this.setState({ openSnackBar: false })

    render() {
        console.log('state', this.state);
        let { teacher_ID, teacher_Name, teacher_familyName, user_PhoneNumber,
            user_Email, teacher_Diploma, teacher_Address,
            teacher_DiplomaOptions, tempMandatory, tempInvalid, errorMsg,
            teacher_Code, user_Name, user_Password,
            teacher_Expertise, user_Type, user_Status, openSnackBar } = this.state;

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
                            {/* <div className="row" style={{ display: errorMsg ? 'block' : 'none', textAlign: 'center' }}>
                                <Alert color="danger" >
                                    {errorMsg}
                                </Alert>
                            </div> */}
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <div className="col-12">
                                    <Avatar alt="Teacher Logo" href="%PUBLIC_URL%/CNAM_Logo.svg.png" style={{ margin: '10px', width: '60px', height: '60px' }} />
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Code</Label>
                                <Input
                                    type="text"
                                    className={`col-8 ${includes(tempMandatory, 'teacher_Code') ? 'alert-danger' : ''}`}
                                    name="teacher_Code"
                                    value={teacher_Code ? teacher_Code : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Name</Label>
                                <Input
                                    type="text"
                                    className={`col-8 ${includes(tempMandatory, 'teacher_Name') ? 'alert-danger' : ''}`}
                                    name="teacher_Name"
                                    value={teacher_Name ? teacher_Name : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Last Name</Label>
                                <Input
                                    type="text"
                                    className={`col-8 ${includes(tempMandatory, 'teacher_familyName') ? 'alert-danger' : ''}`}
                                    name="teacher_familyName"
                                    value={teacher_familyName ? teacher_familyName : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">User Name</Label>
                                <Input
                                    type="text"
                                    className={`col-8 ${includes(tempMandatory, 'user_Name') ? 'alert-danger' : ''}`}
                                    name="user_Name"
                                    value={user_Name ? user_Name : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">User Password </Label>
                                <Input
                                    type="text"
                                    className={`col-8 ${includes(tempMandatory, 'user_Password') ? 'alert-danger' : ''}`}
                                    name="user_Password"
                                    value={user_Password ? user_Password : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Email</Label>
                                <div className='col-8'>
                                    <InputComp
                                        name='user_Email'
                                        value={user_Email ? user_Email : ''}
                                        className={includes(tempMandatory, 'user_Email') ? 'alert-danger' : ''}
                                        onChange={this.handleTextChange}
                                        onBlur={this.handleTextBlur}
                                        errorMsg={includes(tempInvalid, 'user_Email') ? globalMsg.mail : null}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Diploma</Label>
                                <Select
                                    className={`col-8 semestre ${includes(tempMandatory, 'teacher_Diploma') ? 'alert-danger' : ''}`}
                                    name="teacher_Diploma"
                                    value={teacher_Diploma}
                                    options={teacher_DiplomaOptions}
                                    onChange={this.handleSelectChange('teacher_Diploma')}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Expertise</Label>
                                <InputMask
                                    className={`col-8 form-control ${includes(tempMandatory, 'teacher_Expertise') ? 'alert-danger' : ''}`}
                                    mask="999"
                                    maskChar=" "
                                    name="teacher_Expertise"
                                    value={teacher_Expertise ? teacher_Expertise : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Type</Label>
                                <Select
                                    className={`col-8 semestre ${includes(tempMandatory, 'user_Type') ? 'alert-danger' : ''}`}
                                    name="user_Type"
                                    value={user_Type}
                                    options={user_TypeOptions}
                                    onChange={this.handleSelectChange('user_Type')}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Status</Label>
                                <Select
                                    className={`col-8 semestre ${includes(tempMandatory, 'user_Status') ? 'alert-danger' : ''}`}
                                    name="user_Status"
                                    value={user_Status}
                                    options={user_StatusOptions}
                                    onChange={this.handleSelectChange('user_Status')}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-4">Address</Label>
                                <div className='col-8' style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                                    <AlgoliaPlaces
                                        placeholder=''
                                        name='teacher_Address'
                                        onChange={this.handleAddressChange}
                                        className={includes(tempMandatory, 'teacher_Address') ? 'alert-danger testing1' : 'testing2'}
                                        options={{
                                            appId: 'plV842AJCU0M',
                                            apiKey: '6755273aa0e09c361d3d3f873af3326d',
                                            language: 'en',
                                            templates: { teacher_Address },
                                            // language: 'sv', //result in arabic
                                            countries: ['lb'],
                                            type: 'city'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "7px" }}>
                                <Label className="col-4">Phone Number</Label>
                                <div className={`col-8 phone-number ${includes(tempMandatory, 'user_PhoneNumber') ? 'alert-danger' : ''}`} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                    <ReactPhoneInput
                                        defaultCountry='lb'
                                        value={user_PhoneNumber ? user_PhoneNumber : ''}
                                        onChange={this.handlePhoneChange('user_PhoneNumber')}
                                        inputExtraProps={{
                                            name: 'user_PhoneNumber',
                                            // required: true,
                                        }}
                                    />
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

export default NewTeacher;
