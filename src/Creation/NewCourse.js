import React, { Component } from 'react';

import { Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import InputMask from 'react-input-mask';
import Select from "react-virtualized-select";

class Creaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseName: null,
            courseCode: null,
            numberOfCredits: null,
            numberOfHours: null,
            semester: null,
            courseStatus: null,
            semesterOptions: [{ label: 1, value: 1 }, { label: 2, value: 2 }],
            statusOptions: [{ label: "Open", value: "Open" }, { label: "Closed", value: "Closed" }],
        }
    }

    handleTextChange = event => {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSelectChange = name => value => this.setState({ [name]: value })


    render() {
        let { courseName, courseCode, numberOfCredits, numberOfHours, semester, semesterOptions, courseStatus, statusOptions } = this.state;
        //price
        return (
            <div>
                <div className="row" style={{ textAlign: 'center' }}>
                    <Label className="col-12">
                        <b>Course Details</b>
                    </Label>
                </div>
                <div className="row" style={{ marginBottom: "5px" }}>
                    <Label className="col-4">Code</Label>
                    <Input
                        type="text"
                        className="col-8"
                        name="courseCode"
                        value={courseCode}
                        onChange={this.handleTextChange}
                    />
                </div>
                <div className="row" style={{ marginBottom: "5px" }}>
                    <Label className="col-4">Name</Label>
                    <Input
                        type="text"
                        className="col-8"
                        name="courseName"
                        value={courseName}
                        onChange={this.handleTextChange}
                    />
                </div>
                <div className="row" style={{ marginBottom: "5px" }}>
                    <Label className="col-4">Number Of Credits</Label>
                    <InputMask
                        className="col-8 form-control"
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
                        className="col-8 form-control"
                        mask="999"
                        maskChar=" "
                        name="numberOfHours"
                        value={numberOfHours ? numberOfHours : ''}
                        onChange={this.handleTextChange}
                    />
                </div>
                <div className="row" style={{ marginBottom: "5px" }}>
                    <Label className="col-4">Semester</Label>
                    <Select
                        className="col-8 semestre"
                        name="semester"
                        value={semester}
                        options={semesterOptions}
                        onChange={this.handleSelectChange('semester')}
                    />
                </div>
                <div className="row" style={{ marginBottom: "5px" }}>
                    <Label className="col-4">Course Status</Label>
                    <Select
                        className="col-8 semestre"
                        name="courseStatus"
                        value={courseStatus}
                        options={statusOptions}
                        onChange={this.handleSelectChange('courseStatus')}
                    />
                </div>
            </div>
        )
    }
}

export default Creaction;
