import React, { Component } from 'react';
import TopBar from '../Components/TopBar';
import Dashboard from '../Dashboard';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Creaction from '../Creation';

class Full extends Component {
    //#00acc1 background bar
    //#eeeeee body backgrouond
    render() {
        return (
            <div style={{ background: '#eeeeee' }}>
                <TopBar />
                <Router>
                    <Container>
                        <Router>
                            <Route path="/" exact component={Dashboard} />
                            <Route path="/Creation/" component={Creaction} />
                        </Router>
                    </Container>
                </Router>
            </div >

        )
    }

}

export default Full;