import React, { Component } from 'react';
import TopBar from '../Components/TopBar';
import Dashboard from '../Dashboard';
import Creation from '../Creation/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class Full extends Component {

    render() {
        return (
            <div>
                <TopBar />
                <Dashboard />
                {/* <Router> */}

                {/* <Route path="/" component={Dashboard} /> */}
                {/* <Route path="/Creation" component={Creation} /> */}
                {/* </Router> */}
            </div>
        )
    }

}

export default Full;