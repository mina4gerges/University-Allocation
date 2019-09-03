import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Card, CardText, CardBody } from 'reactstrap';
import { map } from 'lodash';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChalkboardTeacher, faSchool } from '@fortawesome/free-solid-svg-icons';
// import ViewTable from './ViewTable';
import './Creation.css';
// import NewRoom from './NewRoom';
// import NewCourse from './NewCourse';
// import NewTeacher from './NewTeacher';
// import { Button } from '@material-ui/core';

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

    // componentDidUpdate() {
    //     console.log('Search Value Creation', this.props.location.search)
    // }

    render() {
        return (
            <div>
                <Container>
                    <div className='row creation-index'>
                        {this.generateData()}
                        {
                            React.createElement(

                            )
                        }
                    </div>
                </Container>
            </div >
        )
    }
}

export default Creation;
