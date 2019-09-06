import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import { map } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { courseStatus, currencyOptions } from '../Data/CreationData';
import NewRoom from './NewRoom';
import NewCourse from './NewCourse';
import NewTeacher from './NewTeacher';
import axios from "axios";
import { DB_Link } from '../global';
import { globalMsg } from '../Data/globalMsg';


const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function ViewTable(props) {
    const [columns, setColumns] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [open, setOpen] = useState(false);
    const [creationComponent] = useState({
        NewRoom,
        NewCourse,
        NewTeacher,
    });
    const classes = useStyles();

    let courseStatusLookup = {};
    let currencyOptionsLookup = {};
    let creationName = window.location.pathname.substring(1);
    let DynamicComponent = creationComponent['New' + creationName];

    map(courseStatus, val => { courseStatusLookup = { ...courseStatusLookup, [val.value]: val.value } })
    map(currencyOptions, val => { currencyOptionsLookup = { ...currencyOptionsLookup, [val.value]: val.value } })

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    let Teacher = [
        { title: 'Code', field: 'teacher_Code', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Name', field: 'teacher_Name', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Family', field: 'teacher_familyName', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Username', field: 'user_Name', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Email', field: 'user_Email', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Phone number', field: 'user_PhoneNumber', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Status', field: 'user_Status', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Expertise', field: 'teacher_Expertise', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Diploma', field: 'teacher_Diploma', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },

    ];
    let Course = [
        // type :'boolean', 'numeric', 'date', 'datetime', 'time', 'currency'
        // select : lookup
        { title: 'Code', field: 'cours_Code', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Name', field: 'cours_Name', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Number Of Credits', field: 'cours_Credit', type: 'numeric', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Number Of Hours', field: 'cours_Hours', type: 'numeric', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Course Price', field: 'cours_Price', type: 'numeric', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Currency', field: 'currency', lookup: { ...currencyOptionsLookup }, headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Semester', field: 'cours_Semestre', lookup: { 1: '1', 2: '2' }, headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Course Status', field: 'cours_Status', lookup: { ...courseStatusLookup }, headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
    ];
    let Room = [
        // type :'boolean', 'numeric', 'date', 'datetime', 'time', 'currency'
        // select : lookup
        { title: 'Name', field: 'room_Name', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Capacity', field: 'room_Capacity', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Floor', field: 'room_Floor', type: 'numeric', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Status', field: 'room_Status', type: 'numeric', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
        { title: 'Campus', field: 'campus_Name', type: 'numeric', headerStyle: { whiteSpace: 'nowrap', paddingRight: '0px' }, cellStyle: { whiteSpace: 'nowrap', paddingRight: '0px' } },
    ];

    useEffect(() => {
        let params = {
            whichData: creationName
        }
        axios({
            method: 'post',
            url: `${DB_Link}LoadData`,
            data: JSON.stringify(params),
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            // cancelToken: this.CancelToken.token
        }).then((response) => {
            let res = response.data.LoadDataResult;
            if (res) {
                res = JSON.parse(res);
                if (creationName === "Teacher") {
                    setColumns(Teacher)
                } else if (creationName === "Course") {
                    setColumns(Course)
                } else if (creationName === "Room") {
                    setColumns(Room)
                }
                setDataTable(res);
            }
        }).catch((error) => {
            // console.log('error', error);
        });
    }, []);

    function handleChange(e) {
        // props.history.push(`/New${creationName}`);
        setOpen(true);
    }

    function handleClose(e) {
        setOpen(false);
    }

    return (

        <div>
            <div className='row view-table-buttom' style={{ marginLeft: '1px', marginRight: '1px', marginBottom: '5px' }}>
                <div className='col-12' style={{ textAlign: 'center' }}>
                    <Fab variant="extended" aria-label="delete" color="primary" className={classes.fab} onClick={handleChange}>
                        <AddIcon className={classes.extendedIcon} />
                        {`New ${creationName}`}
                    </Fab>
                </div>
            </div>
            <div className='row view-table'>
                <div className='col-12'>
                    <MaterialTable
                        icons={tableIcons}
                        title={creationName}
                        // columns={state.columns}
                        columns={columns}
                        // data={state.data}
                        data={dataTable}
                        localization={{
                            body: { emptyDataSourceMessage: globalMsg.emptyDataMsg }
                        }}
                        editable={{
                            // onRowAdd: newData =>
                            //     new Promise(resolve => {
                            //         setTimeout(() => {
                            //             resolve();
                            //             const data = [...state.data];
                            //             data.push(newData);
                            //             setState({ ...state, data });
                            //         }, 600);
                            //     }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        // const data = [...state.data];
                                        const data = [...dataTable];
                                        data[data.indexOf(oldData)] = newData;
                                        // setState({ ...state, data });
                                        setDataTable(data)
                                    }, 600);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        // const data = [...state.data];
                                        const data = [...dataTable];
                                        data.splice(data.indexOf(oldData), 1);
                                        // setState({ ...state, data });
                                        setDataTable(data)
                                    }, 600);
                                }),
                        }}
                    />
                </div>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <DynamicComponent handleClose={handleClose} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default withRouter(ViewTable);