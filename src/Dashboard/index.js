import React, { Component } from 'react';
import { map, find } from 'lodash';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
// import Button from '@material-ui/core/Button';
import DashBoardData from '../Data/DashBoardData';
import ModalDataChange from './ModalDataChange';
import './Dashboard.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DashBoardData: DashBoardData,
            openModalDataChange: false,
            dataSelected: null,
        }
    }

    generateData = () => {
        let { DashBoardData } = this.state;
        let cardDisplay = map(DashBoardData, (val, key) => {
            return (
                <div className='col-3' key={`dash-board-key-${key}`}>
                    <Card className='dash-board-card' onClick={this.classModification(val)}>
                        <CardBody>
                            <CardTitle>{val.className}</CardTitle>
                            <CardSubtitle><b>{val.çourse}</b></CardSubtitle>
                            <CardText>
                                Date: {val.date}<br />
                                Start Time: {val.startTime}<br />
                                End Time: {val.endTime}<br />
                                Number Of Students: {val.nbrStudents}<br />
                                Status: {val.status}<br />
                            </CardText>
                            {/* <Button size="small" color="primary">More Info</Button> */}
                        </CardBody>
                    </Card>
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

    render() {
        let { openModalDataChange, dataSelected } = this.state;

        return (
            <div>
                <div className='row'>{this.generateData()}</div>
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
