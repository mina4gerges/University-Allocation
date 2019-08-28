import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { map } from 'lodash';
import NewRoom from './NewRoom';
import NewCourse from './NewCourse';
import './Creation.css';
import NewTeacher from './NewTeacher';

class Creaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.creationType = [
            'class',
            'course',
            'teacher',
        ]
    }

    handleCardClick = val => event => {
        console.log(val)
        console.log(event)
        switch (val) {
            case "class": return (<NewRoom />);
            case "course": return (<NewCourse />);
            case "teacher": return (<NewTeacher />)
            default: return (<div>Wrong Creation</div>);
        }
    }

    generateData = () => {
        let x = map(this.creationType, (val, key) => {
            return (
                <div className='col-3' key={`creation-type-key-${key}`}>
                    <Card className='creation-type-card' onClick={this.handleCardClick(val)}>
                        <CardBody>
                            <CardTitle>{val}</CardTitle>
                            <CardSubtitle><b>{val}</b></CardSubtitle>
                            <CardText>
                                {val}
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        })
        return x;

    }

    render() {
        return (
            <div>
                <Container maxWidth="sm">
                    <div className='row'>
                        {this.generateData()}
                    </div>
                </Container>
            </div >
        )
    }
}

export default Creaction;
