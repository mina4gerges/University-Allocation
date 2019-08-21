import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import NewClass from './NewClass';
import NewCourse from './NewCourse';
import './Creation.css';

class Creaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    generateData = creationType => {
        switch (creationType.toLowerCase().trim()) {
            case "class": return (<NewClass />);
            case "course": return (<NewCourse />);
            default: return (<div>Wrong Creation</div>);
        }
    }

    render() {
        return (
            <div>
                <Container maxWidth="sm">
                    {this.generateData('course')}
                </Container>
            </div >
        )
    }
}

export default Creaction;
