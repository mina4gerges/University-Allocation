import React, { Component } from 'react';
import TopBar from '../Components/TopBar';
import Dashboard from '../Dashboard';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Creaction from '../Creation';
import NewRoom from '../Creation/NewRoom';
import NewCourse from '../Creation/NewCourse';
import NewTeacher from '../Creation/NewTeacher';

class Full extends Component {
    //#00acc1 background bar
    //#eeeeee body backgrouond
    render() {
        return (
            <div style={{ background: '#eeeeee' }}>
                <Router>
                    <TopBar />
                    <Container style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/Creation" component={Creaction} />
                        <Route path="/Creation/NewRoom" component={NewRoom} />
                        <Route path="/Creation/NewCourse" component={NewCourse} />
                        <Route path="/Creation/NewTeacher" component={NewTeacher} />
                    </Container>
                </Router>
            </div >

        )
    }

}

export default Full;