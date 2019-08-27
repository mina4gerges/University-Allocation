import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faBell, faUser } from '@fortawesome/free-solid-svg-icons'

import SearchField from 'react-search-field';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Dashboard from '../Dashboard/index';
import Creation from '../Creation/index';

import './TopBar.css';

class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }

    onChange = searchValue => {

    }

    render() {

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <span>
                            Dashboard
                        </span>
                        <Router>

                            <Nav>
                                <Link to="/">Dashboard</Link>
                                <Link to="/Creation">Creation</Link>

                                <NavItem>
                                    <NavLink href="#" style={{ color: 'white' }}>Link</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#" style={{ color: 'white' }}>Link</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#" style={{ color: 'white' }}>Another Link</NavLink>
                                </NavItem>
                            </Nav>
                            {/* <Route path="/" component={Dashboard} />
                            <Route path="/Creation" component={Creation} /> */}
                        </Router>
                        <div style={{ position: 'absolute', right: '179px' }}>
                            <SearchField
                                placeholder='Search item'
                                onChange={this.onChange}
                                onEnter={this.onChange}
                            />
                            {/* <InputGroup className="search"> */}
                            {/* <InputGroupAddon addonType="prepend"><FontAwesomeIcon icon={faSearch} size="lg" style={{ margin: '8px' }} /></InputGroupAddon> */}
                            {/* <Input placeholder="Search…" className="test" style={{ background: '#3f51b500', border: 'none' }} /> */}
                            {/* </InputGroup> */}
                        </div>
                        <div style={{ position: 'absolute', right: '3%' }} className='row'>
                            <Badge badgeContent={4} color="secondary">
                                <FontAwesomeIcon icon={faEnvelope} size="lg" className='col-4' />
                            </Badge>

                            <Badge badgeContent={17} color="secondary" className='col-4'>
                                <FontAwesomeIcon icon={faBell} size="lg" />
                            </Badge>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })} className='col-4'>
                                <DropdownToggle caret>
                                    <FontAwesomeIcon icon={faUser} size="lg" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Header</DropdownItem>
                                    <DropdownItem>Some Action</DropdownItem>
                                    <DropdownItem disabled>Action (disabled)</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Foo Action</DropdownItem>
                                    <DropdownItem>Bar Action</DropdownItem>
                                    <DropdownItem>Quo Action</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                        </div>
                        {/* <div className={classes.sectionMobile}> */}
                        {/* <IconButton
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton> */}
                        {/* </div> */}
                    </Toolbar>
                </AppBar>
                {/* {renderMobileMenu} */}
                {/* {renderMenu} */}
                {/* <Router>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/Creation" component={Creation} />
                </Router> */}

            </div >
        );
    }
}
export default TopBar;
