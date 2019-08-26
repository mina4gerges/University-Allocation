import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import NewRoom from './NewRoom';
import NewCourse from './NewCourse';
import './Creation.css';
import NewTeacher from './NewTeacher';

class Creaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    generateData = creationType => {
        switch (creationType.toLowerCase().trim()) {
            case "class": return (<NewRoom />);
            case "course": return (<NewCourse />);
            case "teacher": return (<NewTeacher />)
            default: return (<div>Wrong Creation</div>);
        }
    }

    render() {
        return (
            <div>
                <Container maxWidth="sm">
                    {this.generateData('teacher')}
                </Container>
            </div >
        )
    }
}

export default Creaction;
