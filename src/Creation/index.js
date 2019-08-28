import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Card, CardText, CardBody } from 'reactstrap';
import { map } from 'lodash';
import { BrowserRouter as Router, Link } from "react-router-dom";

import './Creation.css';

class Creation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.creationType = [
            'NewRoom',
            'NewCourse',
            'NewTeacher',
        ]
    }

    generateData = () => {
        let cardDisplay = map(this.creationType, (val, key) => {
            return (
                <div className='col-4' key={`creation-type-key-${key}`}>
                    <Card className='creation-type-card'>
                        <CardBody>
                            <CardText style={{ textAlign: 'center' }}>
                                <Link to={`/Creation/${val}`} ><b>{`Create New ${val}`}</b></Link>
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        })
        return cardDisplay;
    }

    render() {
        return (
            <div>
                <Container>
                    <div className='row'>
                        {this.generateData()}
                    </div>
                </Container>
            </div >
        )
    }
}

export default Creation;
