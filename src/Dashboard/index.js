import React, { Component } from 'react';
import { map, find, groupBy, cloneDeep, filter } from 'lodash';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import DashBoardData from '../Data/DashBoardData';
import ModalDataChange from './ModalDataChange';
import { statusColor } from '../Data/globalMsg';
import './Dashboard.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clonedDashBoardData: cloneDeep(DashBoardData),
            DashBoardData: groupBy(DashBoardData, 'floor'),
            openModalDataChange: false,
            dataSelected: null,

            radioSelectedValue: 'floor',
            live: false,
            upcoming: false,
            cancelled: false,
            vacant: false,

            groupingName: 'floor',
            filtrationName: null
        }
    }

    generateData = () => {
        let { DashBoardData, groupingName } = this.state;
        let cardDisplay = map(DashBoardData, (val1, key1) => {
            return (
                <div className='row' key={`dash-board-key-filtarion${key1}`}>
                    <div className='col-12' style={{ textAlign: 'center', marginBottom: '10px' }}><b>{groupingName + " " + key1}</b></div>
                    {
                        map(val1, (val, key) => {
                            let borderColor = statusColor[val.status];
                            return (
                                <div className='col-3' key={`dash-board-key-${key}`}>
                                    <Card className="dash-board-card" onClick={this.classModification(val)} style={{ border: `3px ${borderColor} solid` }}>
                                        <CardBody>
                                            <CardTitle>{val.room}</CardTitle>
                                            <CardSubtitle><b>{val.çourse}</b></CardSubtitle>
                                            <CardText>
                                                Date: {val.date}<br />
                                                Start Time: {val.startTime}<br />
                                                End Time: {val.endTime}<br />
                                                Number Of Students: {val.nbrStudents}<br />
                                            </CardText>
                                            {/* <Button size="small" color="primary">More Info</Button> */}
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
        return cardDisplay;
    }

    classModification = clickedCardValue => event => this.setState({ openModalDataChange: true, dataSelected: clickedCardValue });

    closeModalDataChange = () => this.setState({ openModalDataChange: false, dataSelected: null });

    handleModalSave = dataSelected => event => {
        let { DashBoardData } = this.state;
        let tempSataSelected = find(DashBoardData, { id: dataSelected.id });
        map(tempSataSelected, (val, key) => {
            if (tempSataSelected[key] !== dataSelected[key]) tempSataSelected[key] = dataSelected[key]
        });
        this.closeModalDataChange();
        this.setState({ DashBoardData });
    }

    handleRadioChange = event => {
        this.handleGrouping(event.target.value.toLowerCase());
        this.setState({ radioSelectedValue: event.target.value })
    }

    handleCheckBoxChange = event => {
        this.handleFiltration(event.target.value.toLowerCase(), 'status');
        this.setState({ [event.target.value]: event.target.checked });
    }

    handleFiltration = (filtrationName, filtrationType) => {
        let { clonedDashBoardData, groupingName } = this.state;
        let DashBoardData = groupBy(filter(clonedDashBoardData, { [filtrationType]: filtrationName }), groupingName);
        this.setState({ DashBoardData, filtrationName });
    }

    handleGrouping = groupingName => {
        let { clonedDashBoardData } = this.state;
        let DashBoardData = groupBy(clonedDashBoardData, groupingName);
        this.setState({ DashBoardData, groupingName });
    }

    render() {
        let { openModalDataChange, dataSelected, radioSelectedValue, live, upcoming, cancelled, vacant } = this.state;

        let liveColor = statusColor.live;
        let upcomingColor = statusColor.upcoming;
        let cancelledColor = statusColor.cancelled;
        let vacantColor = statusColor.vacant;

        const LiveCheckbox = withStyles({
            root: { color: liveColor, '&$checked': { color: liveColor } },
            checked: {},
        })(props => <Checkbox color="default" {...props} />);

        const UpComingCheckbox = withStyles({
            root: { color: upcomingColor, '&$checked': { color: upcomingColor } },
            checked: {},
        })(props => <Checkbox color="default" {...props} />);

        const CancelledCheckbox = withStyles({
            root: { color: cancelledColor, '&$checked': { color: cancelledColor } },
            checked: {},
        })(props => <Checkbox color="default" {...props} />);

        const VacantCheckbox = withStyles({
            root: { color: vacantColor, '&$checked': { color: vacantColor } },
            checked: {},
        })(props => <Checkbox color="default" {...props} />);

        return (
            <div>
                <div className='filtration-bar'>
                    <div className='row filtration-status'>
                        <span className='col-3'><b>Class Status :</b></span>
                        <span className='col-9'>
                            <FormControlLabel
                                control={
                                    <LiveCheckbox
                                        checked={live}
                                        onChange={this.handleCheckBoxChange}
                                        value="live"
                                    />
                                }
                                label='Live'
                                style={{ color: liveColor }}
                            />
                            <FormControlLabel
                                control={
                                    <UpComingCheckbox
                                        checked={upcoming}
                                        onChange={this.handleCheckBoxChange}
                                        value="upcoming"
                                    />
                                }
                                label='Up Coming'
                                style={{ color: upcomingColor }}
                            />
                            <FormControlLabel
                                control={
                                    <CancelledCheckbox
                                        checked={cancelled}
                                        onChange={this.handleCheckBoxChange}
                                        value="cancelled"
                                    />
                                }
                                label='Cancelled'
                                style={{ color: cancelledColor }}
                            />
                            <FormControlLabel
                                control={
                                    <VacantCheckbox
                                        checked={vacant}
                                        onChange={this.handleCheckBoxChange}
                                        value="vacant"
                                    />
                                }
                                label='Vacant'
                                style={{ color: vacantColor }}
                            />
                        </span>
                    </div>

                    <div className='row filtration-floor-room'>
                        <span className='col-3'><b>Floor / Room :</b></span>
                        <span className='col-9'>
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={radioSelectedValue === 'floor'}
                                        onChange={this.handleRadioChange}
                                        value="floor"
                                        name="floor"
                                        color="default"
                                    />
                                }
                                label='Floor'
                            />
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={radioSelectedValue === 'room'}
                                        onChange={this.handleRadioChange}
                                        value="room"
                                        name="room"
                                        color="default"
                                    />
                                }
                                label='Room'
                            />
                        </span>
                    </div>
                </div>
                <div className='dash-board-main' style={{ marginTop: '15px' }}>{this.generateData()}</div>
                {openModalDataChange &&
                    <ModalDataChange
                        open={openModalDataChange}
                        onClose={this.closeModalDataChange}
                        dataSelected={dataSelected}
                        handleModalSave={this.handleModalSave}
                    />
                }
            </div>

        )
    }
}

export default Dashboard;
