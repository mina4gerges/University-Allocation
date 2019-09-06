import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import { Nav, NavItem } from 'reactstrap';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import './Header.css';
// import Dashboard from '../Dashboard';
// import { conditionalExpression } from '@babel/types';

// import { includes, debounce } from 'lodash'

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    headerbackground: {
        background: '#26A65B'//green
    }
}));

// export default function PrimarySearchAppBar(props) {
function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(window.location.pathname === '/' ? 0 : 1);
    const [searchValue, setSearchValue] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    function handleFiltration(event) {
        let val = event.target.value;
        if (!val) props.history.push(window.location.pathname);
        else props.history.push(`${window.location.pathname}?${val}`);
        setSearchValue(val);
    }


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    function handleTabChange(tab) {
        setValue(tab.target.id)
    }

    function handleClick(event) {
        setAnchorEl1(event.currentTarget);
    }

    function handleClose() {
        setValue(1);
        setAnchorEl1(null);
    }

    let creationName = window.location.pathname.substring(1);

    return (
        < div className={classes.grow} >
            <AppBar position="static" className={classes.headerbackground}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Nav tabs>
                        <NavItem>
                            <div className={`MuiTab-root ${parseInt(value, 10) === 0 ? 'active' : 'notActive'}`} style={{ borderBottom: (parseInt(value, 10) === 0 ? "1px solid red" : 'none') }}>
                                <Link to="/" id='0' onClick={handleTabChange}>DASHBOARD</Link>
                            </div>
                        </NavItem>
                        <NavItem>
                            <div className={`MuiTab-root ${parseInt(value, 10) === 1 ? 'active' : 'notActive'}`} style={{ borderBottom: (parseInt(value, 10) === 1 ? "1px solid red" : 'none') }}>
                                {/* <Link to="/Creation" id='1' onClick={handleTabChange}>CREATION</Link> */}
                                <Link id='1' to={window.location.pathname} onClick={handleClick}>CREATION</Link>
                            </div>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl1}
                                keepMounted
                                open={Boolean(anchorEl1)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} key='Room' selected={'Room' === creationName}><Link to="/Room" style={{ color: '#2a2c36', textDecoration: 'none' }}>Room</Link></MenuItem>
                                <MenuItem onClick={handleClose} key='Course' selected={'Course' === creationName}><Link to="/Course" style={{ color: '#2a2c36', textDecoration: 'none' }}>Course</Link></MenuItem>
                                <MenuItem onClick={handleClose} key='Teacher' selected={'Teacher' === creationName}><Link to="/Teacher" style={{ color: '#2a2c36', textDecoration: 'none' }}>Teacher</Link></MenuItem>
                            </Menu>
                        </NavItem>
                    </Nav>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            value={searchValue ? searchValue : ''}
                            onChange={handleFiltration}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar >
            {renderMobileMenu}
            {renderMenu}
        </div >
    );
}

export default withRouter(PrimarySearchAppBar);