import React, { Component } from 'react';
import { map, find, groupBy, cloneDeep, filter, includes, isEmpty } from 'lodash';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import format from 'date-fns/format';
import { DashBoardData } from '../Data/DashBoardData';
import ModalDataChange from './ModalDataChange';
import { statusColor } from '../Data/DashBoardData';
import { nameCapitalized } from '../GlobalFunctions';
import FiltrationBar from './FiltrationBar';
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
            filtrationValue: null,

            tooltipOpen: false
        }

        this.filtrationOption = [
            'live',
            'upcoming',
            'cancelled',
            'vacant',
        ];
    }

    toggle = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    generateCard = () => {
        let { DashBoardData, groupingName } = this.state;
        let cardDisplay = <div className='no-data-found center'>No Data Found</div>;
        if (!isEmpty(DashBoardData)) {
            cardDisplay = map(DashBoardData, (val1, key1) => {
                return (
                    <div className='row' key={`dash-board-key-filtarion${key1}`}>
                        <div className='col-12' style={{ textAlign: 'center', marginBottom: '10px' }}><b>{nameCapitalized(groupingName + " " + key1)}</b></div>
                        {
                            map(val1, (val, key) => {
                                let borderColor = statusColor[val.status];
                                return (
                                    <div className='col-3' key={`dash-board-key-${key}`}>
                                        <Card className="dash-board-card" onClick={this.classModification(val)} style={{ border: `3px ${borderColor} solid`, borderRadius: '10px' }}>
                                            <FontAwesomeIcon icon={faPencilAlt} id={`tooltip-id-${val.id}`} className='center card-icon' style={{ fontSize: '30px' }} />
                                            <CardBody>
                                                <CardTitle style={{ color: 'white', background: borderColor, borderRadius: '3px' }}>{groupingName === 'floor' ? `Room ${val.room}` : `Floor ${val.floor}`}</CardTitle>
                                                <CardText>
                                                    Course: {val.çourse}<br />
                                                    Date: {val.date ? format(val.date, 'dd/MM/yyyy') : ''}<br />
                                                    Start Time: {val.startTime ? format(val.startTime, 'hh:mm a') : ''}<br />
                                                    End Time: {val.endTime ? format(val.endTime, 'hh:mm a') : ''}<br />
                                                    Number Of Students: {val.nbrStudents}<br />
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

    render() {
        let { openModalDataChange, dataSelected, radioSelectedValue, live, upcoming, cancelled, vacant } = this.state;
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
                    />
                }
            </div>

        )
    }
}

export default Dashboard;
