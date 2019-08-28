import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Dashboard from "./Dashboard";
import Creaction from "./Creation";

function Test() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/Creaction/">Creaction</Link>
                        </li>

                        <NavItem>
                            <NavLink href="/" style={{ color: 'red' }}>Link</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Creaction/" style={{ color: 'red' }}>Link</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" style={{ color: 'red' }}>Another Link</NavLink>
                        </NavItem>
                    </ul>
                </nav>

                <Route path="/" exact component={Dashboard} />
                <Route path="/Creaction/" component={Creaction} />
            </div>
        </Router>
    );
}

export default Test;