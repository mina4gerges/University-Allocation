import React, { Component } from 'react';
import { DB_Link } from '../global';
import { Button, Label, Input, Card, CardBody } from 'reactstrap';
import Container from '@material-ui/core/Container';
import { filter, map, includes, isEmpty, startsWith } from 'lodash';
import InputMask from 'react-input-mask';
import Select from "react-virtualized-select";
import axios from "axios";

import { globalMsg } from "../Data/globalMsg";
import { courseStatus, currencyOptions } from "../Data/CreationData";
import SnackBarComp from '../Components/SnackBarCom';
import './Creation.css';
class NewCourse extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cours_ID: '',
            cours_Name: null,
            cours_Code: null,
            cours_Credit: null,
            cours_Hours: null,
            cours_Semestre: null,
            cours_Status: null,
            cours_Price: null,
            currency: null,
            errorMsg: null,
            openSnackBar: false,
            tempMandatory: [],
            semesterOptions: [{ label: 1, value: 1 }, { label: 2, value: 2 }],
            courseStatus,
            currencyOptions,
        };

        this.mandatory = [
            'cours_Name',
            'cours_Code',
            'cours_Credit',
            'cours_Hours',
            'cours_Semestre',
            'cours_Status',
            'cours_Price',
            'currency'
        ];

        this.toSave = [
            "cours_ID",
            "cours_Code",
            "cours_Name",
            "cours_Credit",
            "cours_Hours",
            "cours_Semestre",
            "cours_Status",
            'cours_Price',
            "currency",
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
        return tempMandatory;
    }

    onCloseSnackBar = () => this.setState({ openSnackBar: false })

    handleSave = () => {
        let tempMandatory = this.handleMandatory();
        this.setState({ openSnackBar: true })

        if (isEmpty(tempMandatory)) {//validation
            let savedValue = {};
            map(this.toSave, val => {
                savedValue = { ...savedValue, [val]: typeof (this.state[val]) === 'object' && this.state[val] ? this.state[val].value : this.state[val] }; //TODO
            })
            const params = { ...savedValue };
            axios({
                method: 'post',
                url: `${DB_Link}SaveCours`,
                // url: `${DB_Link}LoadData`,
                data: JSON.stringify(params),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                // cancelToken: this.CancelToken.token
            }).then((response) => {
                let res = response.data.SaveCoursResult;
                this.setState({ errorMsg: res })
                setTimeout(() => { this.props.history.push(`/${window.location.pathname.substring(4)}`) }, 3000)//substring(4) --> to remove / and new)
            }).catch((error) => {
                let errorMsg = globalMsg.errorSaveMsg;
                this.setState({ errorMsg });
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

    render() {

        let { cours_Name, cours_Code, cours_Credit, cours_Hours, cours_Semestre, semesterOptions,
            cours_Status, courseStatus, cours_Price, currency, currencyOptions, tempMandatory, errorMsg, openSnackBar } = this.state;
        return (
            <div>
                <Container maxWidth="sm" className='center'>
                    <Card>
                        <CardBody>
                            <div className="row" style={{ textAlign: 'center' }}>
                                <Label className="col-12">
                                    <b>Course Detail</b>
                                </Label>
                            </div>
                            {/* <div className="row" style={{ display: errorMsg ? 'block' : 'none', textAlign: 'center' }}>
                                <Alert color="danger" >
                                    {errorMsg}
                                </Alert>
                            </div> */}
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-sm-12 col-md-4">Code</Label>
                                <Input
                                    type="text"
                                    className={`col-sm-12 col-md-8 ${includes(tempMandatory, 'cours_Code') ? 'alert-danger' : ''}`}
                                    name="cours_Code"
                                    value={cours_Code ? cours_Code : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-sm-12 col-md-4">Name</Label>
                                <Input
                                    type="text"
                                    className={`col-sm-12 col-md-8 ${includes(tempMandatory, 'cours_Name') ? 'alert-danger' : ''}`}
                                    name="cours_Name"
                                    value={cours_Name ? cours_Name : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-sm-12 col-md-4">Number Of Credits</Label>
                                <InputMask
                                    className={`col-sm-12 col-md-8 form-control ${includes(tempMandatory, 'cours_Credit') ? 'alert-danger' : ''}`}
                                    mask="99"
                                    maskChar=" "
                                    name="cours_Credit"
                                    value={cours_Credit ? cours_Credit : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-sm-12 col-md-4">Number Of Hours</Label>
                                <InputMask
                                    className={`col-sm-12 col-md-8 form-control ${includes(tempMandatory, 'cours_Hours') ? 'alert-danger' : ''}`}
                                    mask="999"
                                    maskChar=" "
                                    name="cours_Hours"
                                    value={cours_Hours ? cours_Hours : ''}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-sm-12 col-md-4">Course Price</Label>
                                <InputMask
                                    className={`col-sm-6 col-md-4 form-control ${includes(tempMandatory, 'cours_Price') ? 'alert-danger' : ''}`}
                                    mask={currency && currency.value === '$' ? '999' : '9999999'}
                                    maskChar=" "
                                    name="cours_Price"
                                    value={cours_Price ? cours_Price : ''}
                                    onChange={this.handleTextChange}
                                />
                                <div className='col-sm-6 col-md-4' style={{ paddingRight: '0px' }}>
                                    <Select
                                        className={`semestre ${includes(tempMandatory, 'currency') ? 'alert-danger' : ''}`}
                                        name="cours_Semestre"
                                        placeholder="Currency"
                                        value={currency}
                                        options={currencyOptions}
                                        onChange={this.handleSelectChange('currency')}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-sm-12 col-md-4">Semester</Label>
                                <Select
                                    className={`col-sm-12 col-md-8 semestre ${includes(tempMandatory, 'cours_Semestre') ? 'alert-danger' : ''}`}
                                    name="cours_Semestre"
                                    value={cours_Semestre}
                                    options={semesterOptions}
                                    onChange={this.handleSelectChange('cours_Semestre')}
                                />
                            </div>
                            <div className="row" style={{ marginBottom: "5px" }}>
                                <Label className="col-sm-12 col-md-4">Course Status</Label>
                                <Select
                                    className={`col-sm-12 col-md-8 semestre ${includes(tempMandatory, 'cours_Status') ? 'alert-danger' : ''}`}
                                    name="cours_Status"
                                    value={cours_Status}
                                    options={courseStatus}
                                    onChange={this.handleSelectChange('cours_Status')}
                                />
                            </div>
                            <div className="row">
                                <div className='col-sm-12 col-md-4'></div>
                                <div className='col-sm-12 col-md-4'>
                                    <Button className='col-sm-12' onClick={this.handleSave} color='success'>SAVE</Button>
                                </div>
                                <div className='col-sm-12 col-md-4'>
                                    <Button className='col-sm-12' onClick={this.handleClear} color='secondary'>CLEAR</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
                <SnackBarComp
                    open={openSnackBar}
                    onClose={this.onCloseSnackBar}
                    message={errorMsg}
                    color={startsWith(errorMsg, 'Successfully Saved') ? 'success' : 'error'}
                />
            </div>
        )
    }
}

export default NewCourse;
