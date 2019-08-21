import React, { Component } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEnvelope, faBell, faUser } from '@fortawesome/free-solid-svg-icons'
import { InputGroup, InputGroupAddon, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './TopBar.css';

// const useStyles = makeStyles(theme => ({
//     grow: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         display: 'none',
//         [theme.breakpoints.up('sm')]: {
//             display: 'block',
//         },
//     },
//     search: {
//         position: 'relative',
//         borderRadius: theme.shape.borderRadius,
//         backgroundColor: fade(theme.palette.common.white, 0.15),
//         '&:hover': {
//             backgroundColor: fade(theme.palette.common.white, 0.25),
//         },
//         marginRight: theme.spacing(2),
//         marginLeft: 0,
//         width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             marginLeft: theme.spacing(3),
//             width: 'auto',
//         },
//     },
//     searchIcon: {
//         width: theme.spacing(7),
//         height: '100%',
//         position: 'absolute',
//         pointerEvents: 'none',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     inputRoot: {
//         color: 'inherit',
//     },
//     inputInput: {
//         padding: theme.spacing(1, 1, 1, 7),
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('md')]: {
//             width: 200,
//         },
//     },
//     sectionDesktop: {
//         display: 'none',
//         [theme.breakpoints.up('md')]: {
//             display: 'flex',
//         },
//     },
//     sectionMobile: {
//         display: 'flex',
//         [theme.breakpoints.up('md')]: {
//             display: 'none',
//         },
//     },
// }));

class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }

    //     const classes = useStyles();
    //     const[anchorEl, setAnchorEl] = React.useState(null);
    //     const[mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    //     const isMenuOpen = Boolean(anchorEl);
    //     const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    //     function handleProfileMenuOpen(event) {
    //     setAnchorEl(event.currentTarget);
    // }

    // function handleMobileMenuClose() {
    //     setMobileMoreAnchorEl(null);
    // }

    // function handleMenuClose() {
    //     setAnchorEl(null);
    //     handleMobileMenuClose();
    // }

    // function handleMobileMenuOpen(event) {
    //     setMobileMoreAnchorEl(event.currentTarget);
    // }

    // const menuId = 'primary-search-account-menu';
    // const renderMenu = (
    //     <Menu
    //         anchorEl={anchorEl}
    //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         id={menuId}
    //         keepMounted
    //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         open={isMenuOpen}
    //         onClose={handleMenuClose}
    //     >
    //         <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    //         <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    //     </Menu>
    // );

    // const mobileMenuId = 'primary-search-account-menu-mobile';
    // const renderMobileMenu = (
    //     <Menu
    //         anchorEl={mobileMoreAnchorEl}
    //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         id={mobileMenuId}
    //         keepMounted
    //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         open={isMobileMenuOpen}
    //         onClose={handleMobileMenuClose}
    //     >
    //         <MenuItem>
    //             <IconButton aria-label="show 4 new mails" color="inherit">
    //                 <Badge badgeContent={4} color="secondary">
    //                     <MailIcon />
    //                 </Badge>
    //             </IconButton>
    //             <p>Messages</p>
    //         </MenuItem>
    //         <MenuItem>
    //             <IconButton aria-label="show 11 new notifications" color="inherit">
    //                 <Badge badgeContent={11} color="secondary">
    //                     <NotificationsIcon />
    //                 </Badge>
    //             </IconButton>
    //             <p>Notifications</p>
    //         </MenuItem>
    //         <MenuItem onClick={handleProfileMenuOpen}>
    //             <IconButton
    //                 aria-label="account of current user"
    //                 aria-controls="primary-search-account-menu"
    //                 aria-haspopup="true"
    //                 color="inherit"
    //             >
    //                 <AccountCircle />
    //             </IconButton>
    //             <p>Profile</p>
    //         </MenuItem>
    //     </Menu>
    // );
    render() {
        // const classes = useStyles();
        // const [anchorEl, setAnchorEl] = React.useState(null);
        // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

        // const isMenuOpen = Boolean(anchorEl);
        // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            // className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <span>
                            Dashboard
                            </span>
                        {/* <div className={classes.search}> */}
                        <div>
                            <InputGroup className="search">
                                <InputGroupAddon addonType="prepend"><FontAwesomeIcon icon={faSearch} size="lg" style={{ margin: '8px' }} /></InputGroupAddon>
                                <Input placeholder="Search…" className="test" style={{ background: '#3f51b500', border: 'none' }} />
                            </InputGroup>
                        </div>
                        <div style={{ position: 'absolute', right: '3%' }} className='row'>
                            {/* <div className={classes.sectionDesktop}> */}
                            <Badge badgeContent={4} color="secondary">
                                <FontAwesomeIcon icon={faEnvelope} size="lg" className='col-4' />
                            </Badge>
                            {/* <IconButton aria-label="show 4 new mails" color="inherit">
                                        <Badge badgeContent={4} color="secondary">
                                            <MailIcon />
                                        </Badge>
                                    </IconButton> */}
                            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
                                        <Badge badgeContent={17} color="secondary">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton> */}
                            <Badge badgeContent={17} color="secondary" className='col-4'>
                                <FontAwesomeIcon icon={faBell} size="lg" />
                            </Badge>
                            {/* <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton> */}

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
            </div>
        );
    }
}
export default TopBar;
