import React, { Component } from 'react';
import { map, find, groupBy, cloneDeep, filter, includes, isEmpty, startsWith } from 'lodash';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import axios from "axios";
import './Dashboard.css';
import { DashBoardData } from '../Data/DashBoardData';
import ModalDataChange from './ModalDataChange';
import { statusColor } from '../Data/DashBoardData';
import { nameCapitalized } from '../GlobalFunctions';
import FiltrationBar from './FiltrationBar';
import { DB_Link } from '../global';
import SnackBarComp from '../Components/SnackBarCom';
import { globalMsg } from '../Data/globalMsg';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clonedDashBoardData: [],
            DashBoardData: [],
            // clonedDashBoardData: cloneDeep(DashBoardData),
            // DashBoardData: groupBy(DashBoardData, 'floor'),

            openModalDataChange: false,
            dataSelected: null,

            radioSelectedValue: 'floor',
            live: false,
            upcoming: false,
            cancelled: false,
            vacant: false,

            groupingName: 'floor',
            filtrationValue: null,

            errorMsg: null,
            openSnackBar: false,
        }

        this.filtrationOption = [
            'live',
            'upcoming',
            'cancelled',
            'vacant',
        ];
    }


    componentDidMount() {
        const CancelToken = axios.CancelToken;
        this.CancelToken = CancelToken.source();

        this.FillData();
    }

    componentWillUnmount() {
        //cancel axios request
        if (this.CancelToken) {
            this.CancelToken.cancel('Request canceled by the user.');
            this.CancelToken = undefined;
        }
    }

    FillData = () => {
        const params = {};
        axios({
            method: 'post',
            url: `${DB_Link}Dashboard`,
            data: JSON.stringify(params),
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            // cancelToken: this.CancelToken.token
        }).then((response) => {
            let res = response.data.DashboardResult;
            if (res) {
                res = JSON.parse(res);
                let Dashboard = JSON.parse(res.Dashboard);
                let CoursesOption = JSON.parse(res.CoursesOption);
                let RoomsOption = JSON.parse(res.RoomsOption);
                let TeachersOption = JSON.parse(res.TeachersOption);
                map(Dashboard, value => {
                    if (value.coursDate && value.startTime && value.endTime) {
                        value.startTime = new Date(value.coursDate + " " + value.startTime);
                        value.endTime = new Date(value.coursDate + " " + value.endTime);
                        value.coursDate = new Date(value.coursDate);
                    }
                })
                this.setState({
                    clonedDashBoardData: cloneDeep(Dashboard),
                    DashBoardData: groupBy(Dashboard, 'floor')
                })
            }
            // console.log('res', res);
        }).catch((error) => {
            // console.log('error', error);
        });
    }


    generateCard = () => {
        let { DashBoardData, groupingName } = this.state;
        let cardDisplay = <div className='no-data-found center'>No Data Found</div>;
        if (!isEmpty(DashBoardData)) {
            cardDisplay = map(DashBoardData, (val1, key1) => {
                return (
                    <div className='row' key={`dash-board-key-filtarion${key1}`}>
                        <div className='col-12' style={{ textAlign: 'center', marginBottom: '10px' }}><b>{nameCapitalized((includes(groupingName, 'room') ? 'Room' : groupingName) + " " + key1)}</b></div>
                        {
                            map(val1, (val, key) => {
                                let borderColor = statusColor[val.status];
                                return (
                                    <div className='col-3' key={`dash-board-key-${key}`}>
                                        <Card className="dash-board-card" onClick={this.classModification(val)} style={{ border: `3px ${borderColor} solid`, borderRadius: '10px' }}>
                                            <FontAwesomeIcon icon={faPencilAlt} id={`tooltip-id-${val.room_ID}`} className='center card-icon' style={{ fontSize: '30px' }} />
                                            <CardBody>
                                                <CardTitle style={{ color: 'white', background: borderColor, borderRadius: '3px' }}>{groupingName === 'floor' ? `Room ${val.room_ID}` : `Floor ${val.floor}`}</CardTitle>
                                                <CardText>
                                                    Course: {val.cours_ID}<br />
                                                    Date: {val.coursDate ? format(val.coursDate, 'dd/MM/yyyy') : ''}<br />
                                                    Start Time: {val.startTime ? format(val.startTime, 'hh:mm a') : ''}<br />
                                                    End Time: {val.endTime ? format(val.endTime, 'hh:mm a') : ''}<br />
                                                    {/* Number Of Students: {val.nbrStudents}<br /> */}
                                                    Capacity: {val.classCapacity}<br />
                                                </CardText>
                                            </CardBody>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                        <hr style={{ width: '90%' }} />
                    </div>
                )
            });
        }
        return cardDisplay;
    }

    classModification = clickedCardValue => event => this.setState({ openModalDataChange: true, dataSelected: clickedCardValue });

    closeModalDataChange = () => this.setState({ openModalDataChange: false, dataSelected: null });

    validationValue = (dataSelected, DashBoardData) => {
        //validation on room_ID, date, time (SAME) // room_ID is not Available at this date/time (DONE)
        //validation on room_ID, date, time (BTW) // room_ID is not Available at this date/time (DONE)
        //validation on room_ID, date, time AND teacher_ID --> this teacher_ID is already assigned to another cours_ID and this date/time (DONE)
        //validation on room_ID, date, time AND cours_ID --> This cours_ID is already assigned to another teacher_ID at this date/time (DONE)

        let errorMsg = null;
        let teacher_ID = dataSelected.teacher_ID ? dataSelected.teacher_ID : '';
        let room_ID = dataSelected.room_ID ? dataSelected.room_ID : '';
        let cours_ID = dataSelected.cours_ID ? dataSelected.cours_ID : '';
        let coursDate = dataSelected.coursDate ? dataSelected.coursDate : null;
        let startTime = dataSelected.startTime ? dataSelected.startTime : null;
        let endTime = dataSelected.endTime ? dataSelected.endTime : null;
        // let status = dataSelected.status;

        let teacherTestValue = [];
        let courseTestValue = [];
        let roomTestValue = [];

        map(DashBoardData, val => {
            let teacherSaved = val.teacher_ID ? val.teacher_ID : '';
            let roomSaved = val.room_ID ? val.room_ID : '';
            let courseSaved = val.cours_ID ? val.cours_ID : '';
            let dateSaved = val.coursDate ? val.coursDate : null;
            let startTimeSaved = val.startTime ? val.startTime : null;
            let endTimeSaved = val.endTime ? val.endTime : null;

            let testConfilctsRoom =
                (
                    roomSaved.toLowerCase().trim() === room_ID.toLowerCase().trim()
                    && (dateSaved && coursDate && format(dateSaved, 'yyy-MM-dd') === format(coursDate, 'yyy-MM-dd'))
                    && (startTimeSaved && startTime && format(startTimeSaved, 'hh:mm a') === format(startTime, 'hh:mm a'))
                    && (endTimeSaved && endTime && format(endTimeSaved, 'hh:mm a') === format(endTime, 'hh:mm a'))
                )
                ||
                (
                    roomSaved.toLowerCase().trim() === room_ID.toLowerCase().trim()
                    && (dateSaved && coursDate && format(dateSaved, 'yyy-MM-dd') === format(coursDate, 'yyy-MM-dd'))
                    && ((isAfter(startTime, startTimeSaved) && isBefore(startTime, endTimeSaved))
                        || (isAfter(endTime, startTimeSaved) && isBefore(endTime, endTimeSaved)))
                )
                ||
                (
                    roomSaved.toLowerCase().trim() === room_ID.toLowerCase().trim()
                    && (dateSaved && coursDate && format(dateSaved, 'yyy-MM-dd') === format(coursDate, 'yyy-MM-dd'))
                    && isBefore(startTime, startTimeSaved) && isBefore(endTimeSaved, endTime)
                );

            let testConfilctsTeacher =
                (
                    teacherSaved.toLowerCase().trim() === teacher_ID.toLowerCase().trim() && //teacher_ID
                    roomSaved.toLowerCase().trim() === room_ID.toLowerCase().trim()
                    && (dateSaved && coursDate && format(dateSaved, 'yyy-MM-dd') === format(coursDate, 'yyy-MM-dd'))
                    && (startTimeSaved && startTime && format(startTimeSaved, 'hh:mm a') === format(startTime, 'hh:mm a'))
                    && (endTimeSaved && endTime && format(endTimeSaved, 'hh:mm a') === format(endTime, 'hh:mm a'))
                )
                ||
                (
                    teacherSaved.toLowerCase().trim() === teacher_ID.toLowerCase().trim() &&//teacher_ID
                    roomSaved.toLowerCase().trim() === room_ID.toLowerCase().trim()
                    && (dateSaved && coursDate && format(dateSaved, 'yyy-MM-dd') === format(coursDate, 'yyy-MM-dd'))
                    && ((isAfter(startTime, startTimeSaved) && isBefore(startTime, endTimeSaved))
                        || (isAfter(endTime, startTimeSaved) && isBefore(endTime, endTimeSaved)))
                )
                ||
                (
                    teacherSaved.toLowerCase().trim() === teacher_ID.toLowerCase().trim() &&//teacher_ID
                    roomSaved.toLowerCase().trim() === room_ID.toLowerCase().trim()
                    && (dateSaved && coursDate && format(dateSaved, 'yyy-MM-dd') === format(coursDate, 'yyy-MM-dd'))
                    && isBefore(startTime, startTimeSaved) && isBefore(endTimeSaved, endTime)
                );

            let testConfilctsCourse =
                (
                    courseSaved.toLowerCase().trim() === cours_ID.toLowerCase().trim() && //cours_ID
                    roomSaved.toLowerCase().trim() === room_ID.toLowerCase().trim()
                    && (dateSaved && coursDate && format(dateSaved, 'yyy-MM-dd') === format(coursDate, 'yyy-MM-dd'))
                    && (startTimeSaved && startTime && format(startTimeSaved, 'hh:mm a') === format(startTime, 'hh:mm a'))
                    && (endTimeSaved && endTime && format(endTimeSaved, 'hh:mm a') === format(endTime, 'hh:mm a'))
                )
                ||
                (
                    courseSaved.toLowerCase().trim() === cours_ID.toLowerCase().trim() &&//cours_ID
                    roomSaved.toLowerCase().trim() === room_ID.toLowerCase().trim()
                    && (dateSaved && coursDate && format(dateSaved, 'yyy-MM-dd') === format(coursDate, 'yyy-MM-dd'))
                    && ((isAfter(startTime, startTimeSaved) && isBefore(startTime, endTimeSaved))
                        || (isAfter(endTime, startTimeSaved) && isBefore(endTime, endTimeSaved)))
                )
                ||
                (
                    courseSaved.toLowerCase().trim() === cours_ID.toLowerCase().trim() &&//cours_ID
                    roomSaved.toLowerCase().trim() === room_ID.toLowerCase().trim()
                    && (dateSaved && coursDate && format(dateSaved, 'yyy-MM-dd') === format(coursDate, 'yyy-MM-dd'))
                    && isBefore(startTime, startTimeSaved) && isBefore(endTimeSaved, endTime)
                );

            if (testConfilctsTeacher) teacherTestValue.push(val);
            if (testConfilctsCourse) courseTestValue.push(val);
            if (testConfilctsRoom) roomTestValue.push(val);
        })

        let conflicts = false;
        if (!isEmpty(teacherTestValue)) {
            errorMsg = globalMsg.conflictTeacherMsg;
            conflicts = true;
        }
        else if (!isEmpty(courseTestValue)) {
            errorMsg = globalMsg.conflictCourseMsg;
            conflicts = true;
        }
        else if (!isEmpty(roomTestValue)) {
            errorMsg = globalMsg.conflictRoomMsg;
            conflicts = true;
        }
        return { conflicts, errorMsg };
    }

    handleModalSave = dataSelected => event => {
        let { DashBoardData, clonedDashBoardData } = this.state;
        let returnedValidationObject = this.validationValue(dataSelected, clonedDashBoardData);
        let errorMsg = null;
        if (returnedValidationObject.conflicts) {
            errorMsg = returnedValidationObject.errorMsg;
            this.setState({ openSnackBar: true, errorMsg })
        }
        else {
            let tempSataSelected = find(clonedDashBoardData, { room_ID: dataSelected.room_ID });
            map(tempSataSelected, (val, key) => {
                if (tempSataSelected[key] !== dataSelected[key]) tempSataSelected[key] = dataSelected[key]
            });

            let savedValue = {};
            savedValue.class_ID = dataSelected.class_ID ? dataSelected.class_ID : ''
            savedValue.room_ID = dataSelected.room_ID;
            savedValue.cours_ID = dataSelected.cours_ID;
            savedValue.teacher_ID = dataSelected.teacher_ID;
            // savedValue.status = dataSelected.status;
            savedValue.status = 'live';
            savedValue.coursDate = format(dataSelected.coursDate, 'dd/MM/yyyy');
            savedValue.startTime = format(dataSelected.startTime, 'hh:mm a');
            savedValue.endTime = format(dataSelected.endTime, 'hh:mm a');

            const params = { ...savedValue };
            axios({
                method: 'post',
                url: `${DB_Link}SaveDashboard`,
                data: JSON.stringify(params),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                // cancelToken: this.CancelToken.token
            }).then((response) => {
                let res = response.data.SaveDashboardResult;
                errorMsg = 'Successfully Saved';
                this.closeModalDataChange();
                this.setState({ openSnackBar: true, errorMsg })
            }).catch((error) => {
                errorMsg = 'Error Occurred';
                this.setState({ openSnackBar: true, errorMsg })
            });
            this.setState({ DashBoardData, clonedDashBoardData });
        }
        // this.setState({ openSnackBar: true, errorMsg })
    }

    handleRadioChange = event => {
        let value = event.target.value.toLowerCase();
        // this.handleGrouping(event.target.value.toLowerCase());
        this.handleGrouping(event.target.value);
        this.setState({ radioSelectedValue: event.target.value })
    }

    handleCheckBoxChange = event => {
        this.handleFiltration(event.target.value.toLowerCase(), 'status');
        this.setState({ [event.target.value]: event.target.checked });
    }

    filterCard = (clonedDashBoardData, groupingName, DashBoardData, filtrationChecked, filtrationType) => {
        DashBoardData = groupBy(filter(clonedDashBoardData, val => {
            return ((includes(filtrationChecked, 'live') && val[filtrationType] === 'live')
                || (includes(filtrationChecked, 'upcoming') && val[filtrationType] === 'upcoming')
                || (includes(filtrationChecked, 'cancelled') && val[filtrationType] === 'cancelled')
                || (includes(filtrationChecked, 'vacant') && val[filtrationType] === 'vacant')
            )
        }), groupingName);
        return DashBoardData
    }

    handleFiltration = (filtrationValue, filtrationType) => {
        this.setState({ filtrationValue }, () => {
            let { clonedDashBoardData, groupingName } = this.state;
            let DashBoardData = groupBy(clonedDashBoardData, groupingName);
            let filtrationChecked = [];
            map(this.filtrationOption, val => { if (this.state[val]) filtrationChecked.push(val) })
            if (!isEmpty(filtrationChecked)) DashBoardData = this.filterCard(clonedDashBoardData, groupingName, DashBoardData, filtrationChecked, filtrationType);
            this.setState({ DashBoardData })
        });
    }

    handleGrouping = groupingName => {
        let { clonedDashBoardData } = this.state;
        let DashBoardData = groupBy(clonedDashBoardData, groupingName);
        let filtrationChecked = [];
        map(this.filtrationOption, val => { if (this.state[val]) filtrationChecked.push(val) })
        if (!isEmpty(filtrationChecked)) DashBoardData = this.filterCard(clonedDashBoardData, groupingName, DashBoardData, filtrationChecked, 'status');
        this.setState({ DashBoardData, groupingName });
    }

    onCloseSnackBar = () => this.setState({ openSnackBar: false })

    handleErrorMsg = errorMsg => this.setState({ openSnackBar: true, errorMsg })

    // componentDidUpdate() {
    //     let { DashBoardData } = this.state;
    //     let x = map(DashBoardData, val => {
    //         return (map(val, val1 => {
    //             return (filter(val1, (val2, key2) => {
    //                 return val2 === this.props.location.search
    //             }))
    //         }))
    //     })
    // }

    render() {
        let { openModalDataChange, dataSelected, radioSelectedValue,
            live, upcoming, cancelled, vacant, openSnackBar, errorMsg } = this.state;
        console.log('errorMsg')
        return (
            <div>
                <FiltrationBar
                    statusColor={statusColor}
                    radioSelectedValue={radioSelectedValue}
                    live={live}
                    upcoming={upcoming}
                    cancelled={cancelled}
                    vacant={vacant}
                    handleCheckBoxChange={this.handleCheckBoxChange}
                    handleRadioChange={this.handleRadioChange}
                />

                <div className='dash-board-main' style={{ marginTop: '15px' }}>{this.generateCard()}</div>

                {openModalDataChange &&
                    <ModalDataChange
                        open={openModalDataChange}
                        onClose={this.closeModalDataChange}
                        dataSelected={dataSelected}
                        handleModalSave={this.handleModalSave}
                        handleErrorMsg={this.handleErrorMsg}
                    />
                }
                <SnackBarComp
                    open={openSnackBar}
                    onClose={this.onCloseSnackBar}
                    message={errorMsg}
                    color={startsWith(errorMsg, 'Success') ? 'success' : 'error'}
                />
            </div>

        )
    }
}

export default Dashboard;
