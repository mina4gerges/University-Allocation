import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Card, CardText, CardBody } from 'reactstrap';
import { map } from 'lodash';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChalkboardTeacher, faSchool } from '@fortawesome/free-solid-svg-icons';
import './Creation.css';

class Creation extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }

        this.creationType = [
            { name: 'Room', icon: faSchool, path: 'NewRoom', color: 'blue' },
            { name: 'Course', icon: faChalkboardTeacher, path: 'NewCourse', color: 'green' },
            { name: 'Teacher', icon: faUser, path: 'NewTeacher', color: 'red' },
        ]
    }

    redirect = path => e => this.props.history.push(`/Creation/${path}`)

    generateData = () => {
        let cardDisplay = map(this.creationType, (val, key) => {
            return (
                <div className='col-4' key={`creation-type-key-${key}`}>
                    <Card className={`creation-type-card hover-${val.color}`} style={{ border: `2px ${val.color} solid` }} onClick={this.redirect(val.path)}>
                        <CardBody>
                            <CardText className='center'>
                                <Link to={`/Creation/${val.path}`} style={{ color: '#2a2c36', textDecoration: 'none' }}>
                                    {val.icon && <FontAwesomeIcon icon={val.icon} style={{ marginRight: '5px', fontSize: '24px', color: val.color }} />}
                                    <b style={{ color: val.color }}>{`Create New ${val.name}`}</b>
                                </Link>
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
